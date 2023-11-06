import { client } from "websocket"

import type { connection, Message } from "websocket"

import config from  "./config"
import logger from "./logger"

class Consumer {
  private ws: client = new client()

  private url = `ws://${config.ari.host}:${config.ari.port}/ari/events?api_key=${config.ari.user}:${config.ari.password}&app=${config.ari.app}`

  public start(): void {
    logger.log("Started")

    this.ws.connect(this.url)

    this.ws.on("connectFailed", () => {
      this.reconnect()
    })

    this.ws.on("connect", (connection: connection) => {
      logger.info('Successfully connected to ARI')

      if (typeof process.send === "function") {
        process.send("ready")
        process.on("SIGINT", () => {
          connection.close()
          process.exit(0)
        })
      }

      connection.on("error", error => {
        logger.error(error)
        this.reconnect()
      })

      connection.on("close", code => {
        logger.error(`Connection close: ${code}`)
        this.reconnect()
      })

      connection.on("message", (message: Message) => {
        try {
          if (message.type === "utf8") {
            // const json = JSON.parse(message.utf8Data)

            // if (json.type === AriEventType.ApplicationReplaced) {
            //   this.logger.info("Application replaced")
            //   process.exit()
            // }

            logger.log(message.utf8Data)
          }
        } catch (error) {
          logger.error(`Parsing error: ${(error as Error).message}`)
        }
      })
    })
  }

  private reconnect(): void {
    setTimeout(() => {
      logger.info(`Reconnect to ARI`)
      this.ws.connect(this.url)
    }, 5000)
  }
}

export default Consumer
