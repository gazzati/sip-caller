import OutgoingEventsProcessor from "@scopes/outgoing"
import TalkerEventsProcessor from "@scopes/talker"

import config from "@root/config"

import redis from "@database/redis"
import Logger, { Service } from "@services/logger"

import { AriEvent } from "@interfaces/ari"

class Processor {
  private logger = new Logger(Service.Processor)
  public start() {
    this.logger.info("Started")

    this.loop()
  }

  private async loop(): Promise<void> {
    const response = await redis.blpop(config.redis.keys.event, 20)

    if (response) {
      const [, data] = response
      const event: AriEvent = JSON.parse(data)

      const channelId = event.channel?.id || event.peer?.id
      if (!channelId) return this.loop()

      const Event = this.getEvent(event)
      if (Event) new Event(event).call()
    }

    this.loop()
  }

  private getEvent(event: AriEvent) {
    if (event.channel?.dialplan.context === "talker") return TalkerEventsProcessor[event.type]
    return OutgoingEventsProcessor[event.type]
  }
}

export default Processor
