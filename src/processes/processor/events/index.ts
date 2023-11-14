import { AriEventType } from "@interfaces/ari"

import { ChannelDestroyed } from "./channel-destroyed"
import { ChannelStateChange } from "./channel-state-change"
import { StasisEnd } from "./stasis-end"
import { StasisStart } from "./stasis-start"

type ClassRef = new (...args: Array<any>) => any

interface EventMap {
  [event: string]: ClassRef
}

export const EventsProcessor: EventMap = {
  [AriEventType.StasisStart]: StasisStart,
  [AriEventType.StasisEnd]: StasisEnd,
  [AriEventType.ChannelStateChange]: ChannelStateChange,
  [AriEventType.ChannelDestroyed]: ChannelDestroyed,
}
