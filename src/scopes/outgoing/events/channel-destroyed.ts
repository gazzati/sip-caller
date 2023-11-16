import EventBase from "./event.base"

export class ChannelDestroyed extends EventBase {
  public async call() { // only for dst channel
    const channel = await this.storage.get(this.channelId)
    if(!channel?.masterChannelId) return

    this.logger.info(`Dst channel ${this.channelId} destroyed`)

    this.ari.removeChannel(channel.masterChannelId)
  }
}
