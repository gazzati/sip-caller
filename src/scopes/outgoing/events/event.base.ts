import Ari from "@root/ari"
import Storage from "@scopes/outgoing/storage"

import Logger, { Service } from "@services/logger"

import type { AriEvent } from "@interfaces/ari"

abstract class EventBase {
  public ari = new Ari()
  public storage = new Storage()
  public logger = new Logger(Service.Outgoing)

  public event: AriEvent
  public channelId: string
  public exten: string
  public number: string

  constructor(event: AriEvent) {
    this.event = event
    this.exten = event?.channel?.dialplan?.exten || ""
    this.number = event?.channel?.caller?.number || ""
    this.channelId = this.event.channel?.id || this.event.peer?.id || ""
  }
}

export default EventBase
