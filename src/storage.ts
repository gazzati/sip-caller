import merge from "merge-deep"

import redis from "@database/redis"

import { ChannelData } from "@interfaces/storage"

export interface IInitial {
  callId: string
  remoteSignalIp?: string
  exten: string
  channelId: string
  channelName: string
  context: string
  pstnTrunkset?: number | null
  proxy?: string
  uuid: string
}

class Storage {
  private readonly prefix = "call"
  private readonly ttl = 21600

  public async save(objectId: string, attributes: Partial<ChannelData>): Promise<void> {
    const key = this.getKey(objectId)
    const currentData = await redis.get(key)
    const newData = currentData ? merge(JSON.parse(currentData), attributes) : attributes
    await redis.setex(key, this.ttl, JSON.stringify(newData))
  }

  public async get(objectId: string): Promise<ChannelData> {
    const key = this.getKey(objectId)
    const data = await redis.get(key)
    return data ? JSON.parse(data) : null
  }

  public async remove(objectId: string): Promise<any> {
    const key = this.getKey(objectId)
    return await redis.del(key)
  }

  private getKey(objectId: string): string {
    return `${this.prefix}:${objectId}`
  }
}

export default Storage
export { ChannelData }
