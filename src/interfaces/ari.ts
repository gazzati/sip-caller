export enum AriEventType {
  ApplicationReplaced = "ApplicationReplaced",
  StasisStart = "StasisStart",
  StasisEnd = "StasisEnd",
  Dial = "Dial",
  ChannelStateChange = "ChannelStateChange",
  ChannelHangupRequest = "ChannelHangupRequest",
  PlaybackStarted = "PlaybackStarted",
  PlaybackFinished = "PlaybackFinished",
  ChannelHold = "ChannelHold",
  ChannelUnhold = "ChannelUnhold",
  ChannelDtmfReceived = "ChannelDtmfReceived",
  ChannelDestroyed = "ChannelDestroyed"
}

export enum ChannelState {
  Up = "Up",
  Down = "Down",
  Ringing = "Ringing",
  Ring = "Ring"
}

export interface AriChannel {
    id: string
    name: string
    state?: string
    caller: { name: string; number: string }
    connected: { name: string; number: string }
    accountcode: string
    dialplan: AriDialplan
    creationtime: Date
    language: string
  }

export interface AriDialplan {
  context: string
  exten: string
  priority: number
}

export interface AriPeer {
  id: string
  name: string
  state: ChannelState
  caller: { name: string; number: string }
  connected: { name: string; number: string }
  accountcode: string
  dialplan: AriDialplan
  creationtime: string
  language: string
}

export interface AriEvent {
  type: AriEventType
  timestamp: Date
  asterisk_id?: string
  application?: string
  dialstatus?: string
  channel?: AriChannel
  peer?: AriPeer
  args?: Array<string>
  cause?: string
  digit?: string
  duration_ms?: number
  //playback?: IPlayback
}
