import { AriEventType } from "@interfaces/ari"

import { ChannelDestroyed } from "./events/channel-destroyed"
import { ChannelStateChange } from "./events/channel-state-change"
import { StasisEnd } from "./events/stasis-end"
import { StasisStart } from "./events/stasis-start"

type ClassRef = new (...args: Array<any>) => any

interface EventMap {
  [event: string]: ClassRef
}

const EventsProcessor: EventMap = {
  [AriEventType.StasisStart]: StasisStart,
  [AriEventType.StasisEnd]: StasisEnd,
  [AriEventType.ChannelStateChange]: ChannelStateChange,
  [AriEventType.ChannelDestroyed]: ChannelDestroyed
}

export default EventsProcessor
