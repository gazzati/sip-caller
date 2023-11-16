import Ari from "@processes/processor/ari"

import Storage from "@root/storage"

import type {AriEvent} from "@interfaces/ari"

abstract class EventBase {
  public ari = new Ari()
  public storage = new Storage()

  public event: AriEvent
  public channelId: string
  public exten: string
  public number: string

  constructor(event: AriEvent) {
    this.event = event
    this.exten = event?.channel?.dialplan?.exten || ""
    this.number = event?.channel?.caller?.number || ""
    this.channelId = this.getChannelId()
  }

  private getChannelId(): string {
    const result = this.event.channel?.id || this.event.peer?.id
    // if ((event as PlaybackFinishedEvent).playback) {
    //   result = (event as PlaybackFinishedEvent).playback.target_uri.split(":").pop()
    // }

    return result || ""
  }
}

export default EventBase
