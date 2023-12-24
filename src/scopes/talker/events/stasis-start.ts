import dayjs from "dayjs"
import { v1 as uuidv1 } from "uuid"

import type {AriChannel} from '@interfaces/ari';

import EventBase from "./event.base"

export class StasisStart extends EventBase {
  public async call() {
    this.logger.info(`Start for channel ${this.channelId} 🚀`)

    const ip = this.event.channel?.caller.name || ""

    const dstChannel = await this.getDstChannel()

    if (!dstChannel) {
      this.storage.addTalkerPendingChannel(this.channelId)
      return this.logger.info(`Not found match for ${this.channelId} 🔄`)
    }

    const dstChannelId = dstChannel.id
    const dstChannelIp = dstChannel?.caller.name || ""

    this.storage.removeTalkerPendingChannel(this.channelId)
    // this.logger.info(`Start call between ${this.channelId}(${ip}) and ${dstChannelId}(${dstChannelIp}) ✨`)
    this.logger.info(`Start call between ${this.channelId} and ${dstChannelId} ✨`)

    try {
      const bridgeId = uuidv1()
      const bridge = await this.ari.createBridge(bridgeId)
      if (!bridge) return this.logger.error("Bridge is not created")

      const bridgedAt = dayjs().toDate()

      this.storage.save(this.channelId, { bridgeId: bridge.id, dstChannelId, ip, bridgedAt })
      this.storage.save(dstChannelId, { bridgeId: bridge.id, dstChannelId: this.channelId, ip: dstChannelIp, bridgedAt })

      await this.ari.addChannelsToBridge(bridge.id, [this.channelId, dstChannelId])
      await this.ari.answer(this.channelId)
      await this.ari.answer(dstChannelId)

      return
    } catch (error) {
      this.storage.addTalkerPendingChannel(this.channelId)
      this.logger.error(error)
      return
    }
  }

  private async getDstChannel(): Promise<AriChannel | null> {
    const pendingTalkerChannels = await this.storage.getTalkerPendingChannels()
    if (!pendingTalkerChannels?.length) return null

    const ariChannels = await this.ari.getChannels()
    if (!ariChannels?.length) return null

    const relevantChannels = ariChannels.reduce((acc: Array<AriChannel>, channel: AriChannel) => {
      if (channel.state !== "Ring" || !pendingTalkerChannels.includes(channel.id) || channel.id === this.channelId) return acc
      return [...acc, channel]
    }, [])

    return relevantChannels.at(-1) || null
  }
}
