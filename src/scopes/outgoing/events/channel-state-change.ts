import EventBase from "./event.base"

export class ChannelStateChange extends EventBase  {
  public async call() {
    const channel = await this.storage.get(this.channelId)
    if(!channel?.masterChannelId) return

    if(this.event.channel?.state !== "Up") return

    await this.ari.addChannelsToBridge(channel.bridgeId, [this.channelId, channel.masterChannelId])
    await this.ari.answer(channel.masterChannelId)
  }
}
