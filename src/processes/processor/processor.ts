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
      const event = JSON.parse(data)
      const channelId = this.getChannelId(event)

      console.log(event)
      // const channelData = await this.storage.get(channelId)

      // if (channelData && channelData.context) {
      //   const Processor = this.getProcessor(channelData.context, event)
      //   if (Processor) new Processor(event, channelData).call()
      // }
    }

    this.loop()
  }

  private getChannelId(event: AriEvent): string {
    const result = event.channel?.id || event.peer?.id
    // if ((event as PlaybackFinishedEvent).playback) {
    //   result = (event as PlaybackFinishedEvent).playback.target_uri.split(":").pop()
    // }

    return result || ""
  }
}

export default Processor
