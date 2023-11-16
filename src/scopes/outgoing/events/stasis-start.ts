import { v1 as uuidv1, } from "uuid"

import EventBase from "./event.base"

export class StasisStart extends EventBase  {
  public async call() {
    if(!this.event.args?.length) return

    const channelId = uuidv1()
    const bridgeId = uuidv1()

    const channel = await this.ari.createChannel(`PJSIP/${this.exten}`, channelId)
    this.logger.info(`Create channel to PJSIP/${this.exten}`)

    if(!channel) return console.error("Channel is not created")

    const bridge = await this.ari.createBridge(bridgeId)
    if(!bridge) return console.error("Bridge is not created")

    this.storage.save(this.channelId, {
      bridgeId: bridge.id,
      dstChannelId: channel.id
    })

    this.storage.save(channel.id, {
      masterChannelId: this.channelId,
      bridgeId: bridge.id
    })

    this.ari.dial(channel.id)
  }
}
