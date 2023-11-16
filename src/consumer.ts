import { client } from "websocket"

import config from  "@root/config"
import { AriEventType } from "@root/interfaces/ari"

import redis from "@database/redis"
import Logger, {Service} from "@services/logger"

import type { connection, Message } from "websocket"

const ARI_EVENTS = Object.values(AriEventType)

class Consumer {
  private ws = new client()
  private logger = new Logger(Service.Consumer)

  private url = `wss://${config.ari.host}/ari/events?api_key=${config.ari.user}:${config.ari.password}&app=${config.ari.app}`
  //private url = `ws://${config.ari.host}:${config.ari.port}/ari/events?api_key=${config.ari.user}:${config.ari.password}&app=${config.ari.app}`

  public start() {
    this.logger.info("Started")

    this.ws.connect(this.url)

    this.ws.on("connectFailed", () => {
      this.reconnect()
    })

    this.ws.on("connect", (connection: connection) => {
      this.logger.info('Successfully connected to ARI')

      if (typeof process.send === "function") {
        process.send("ready")
        process.on("SIGINT", () => {
          connection.close()
          process.exit(0)
        })
      }

      connection.on("error", error => {
        this.logger.error(error)
        this.reconnect()
      })

      connection.on("close", code => {
        this.logger.error(`Connection close: ${code}`)
        this.reconnect()
      })

      connection.on("message", (message: Message) => {
        try {
          if (message.type === "utf8") {
            const json = JSON.parse(message.utf8Data)

            if (json.type === AriEventType.ApplicationReplaced) {
              this.logger.info("Application replaced")
              process.exit()
            }

            if (ARI_EVENTS.includes(json.type)) {
              redis.rpush(config.redis.keys.event, message.utf8Data)
            }
          }
        } catch (error) {
          this.logger.error(`Parsing error: ${(error as Error).message}`)
        }
      })
    })
  }

  private reconnect() {
    setTimeout(() => {
      this.logger.info(`Reconnect to ARI`)
      this.ws.connect(this.url)
    }, 5000)
  }
}

export default Consumer
