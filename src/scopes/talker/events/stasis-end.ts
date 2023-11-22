import dayjs from "dayjs"

import EventBase from "./event.base"

export class StasisEnd extends EventBase {
  public async call() {
    const channel = await this.storage.get(this.channelId)
    if (!channel?.dstChannelId) return

    this.ari.removeChannel(channel.dstChannelId)

    this.storage.remove(channel.dstChannelId)
    this.storage.remove(this.channelId)

    const duration = dayjs(dayjs()).diff(dayjs(channel.bridgedAt), "second")
    this.logger.info(`End call for channel ${this.channelId}(${channel.ip}) ✅. Duration - ${duration} seconds`)
  }
}
