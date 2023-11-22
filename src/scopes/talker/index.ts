import { AriEventType } from "@interfaces/ari"

import { StasisEnd } from "./events/stasis-end"
import { StasisStart } from "./events/stasis-start"

type ClassRef = new (...args: Array<any>) => any

interface EventMap {
  [event: string]: ClassRef
}

const EventsProcessor: EventMap = {
  [AriEventType.StasisStart]: StasisStart,
  [AriEventType.StasisEnd]: StasisEnd
}

export default EventsProcessor
