import dayjs from "dayjs"
import { v1 as uuidv1 } from "uuid"

import EventBase from "./event.base"

export class StasisStart extends EventBase {
  public async call() {
    this.logger.info(`Start for channel ${this.channelId} 🚀`)

    const dstChannelId = await this.getDstChannelId()

    if (!dstChannelId) {
      this.storage.addTalkerPendingChannel(this.channelId)
      return this.logger.info(`Not found match for ${this.channelId} 🔄`)
    }

    this.storage.removeTalkerPendingChannel(this.channelId)
    this.logger.info(`Start call between ${this.channelId} and ${dstChannelId} ✨`)

    try {
      const bridgeId = uuidv1()
      const bridge = await this.ari.createBridge(bridgeId)
      if (!bridge) return this.logger.error("Bridge is not created")

      const bridgedAt = dayjs().toDate()

      this.storage.save(this.channelId, { bridgeId: bridge.id, dstChannelId, bridgedAt })
      this.storage.save(dstChannelId, { bridgeId: bridge.id, dstChannelId: this.channelId, bridgedAt })

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

  private async getDstChannelId(): Promise<string | null> {
    const pendingTalkerChannels = await this.storage.getTalkerPendingChannels()
    if (!pendingTalkerChannels.length) return null

    const ariChannels = await this.ari.getChannels()
    if (!ariChannels.length) return null

    const ariChannelsIds = ariChannels.reduce((acc, channel) => {
      if (channel.state !== "Ring") return acc
      return [...acc, channel.id]
    }, [])

    const relevantChannels = pendingTalkerChannels?.filter(id => id !== this.channelId && ariChannelsIds.includes(id))
    return relevantChannels[0] || null
  }
}
