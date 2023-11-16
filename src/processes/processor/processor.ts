import Ari from '@processes/processor/ari';
import { EventsProcessor } from "@processes/processor/events"
import {v1 as uuidv1} from 'uuid';

import config from "@root/config"

import redis from "@database/redis"
import logger from "@services/logger"

import { AriEvent, AriEventType } from "@interfaces/ari"

const ari = new Ari()

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
      if(!channelId) return this.loop()

      if(event.type === AriEventType.StasisStart && event?.channel?.dialplan?.exten === "talker") {
        const channels = await ari.getChannels()
        const dstChannelId = channels[0]?.id
        if(!dstChannelId) return console.error("dst channel not found")

        const bridgeId = uuidv1()
        const bridge = await ari.createBridge(bridgeId)
        if(!bridge) return console.error("bridge is not created")

        ari.addChannelsToBridge(bridge.id, [channelId, dstChannelId])
        ari.answer(channelId)
        ari.answer(dstChannelId)

        return
      }

      const Event = EventsProcessor[event.type]
      if (Event) new Event(event).call()
    }

    this.loop()
  }
}

export default Processor
