import { EventsProcessor } from "@processes/processor/events"

import config from "@root/config"
import redis from "@root/database/redis"
import { AriEvent } from "@root/interfaces/ari"

import logger from "@services/logger"

class Processor {
  public start() {
    logger.log("Processor started")

    this.loop()
  }

  private async loop(): Promise<void> {
    const response = await redis.blpop(config.redis.keys.event, 20)

    if (response) {
      const [, data] = response
      const event: AriEvent = JSON.parse(data)
      const channelId = event.channel?.id || event.peer?.id

      const Event = EventsProcessor[event.type]
      if (Event) new Event(event).call()
    }

    this.loop()
  }
}

export default Processor
