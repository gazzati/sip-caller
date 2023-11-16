import EventBase from "./event.base"

export class StasisEnd extends EventBase  {
  public async call() {
    const channel = await this.storage.get(this.channelId)
    if(!channel) return

    // if(channel.bridgeId) this.ari.removeChannelsFromBridge(channel.bridgeId, [this.channelId])

    if(channel.dstChannelId) return this.ari.removeChannel(channel.dstChannelId)
  }
}
