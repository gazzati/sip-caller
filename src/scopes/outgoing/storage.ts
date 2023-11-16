import merge from "merge-deep"

import redis from "@database/redis"

import { OutgoingChannelData } from "@interfaces/outgoing"

class Storage {
  private readonly prefix = "call"
  private readonly ttl = 21600

  public async save(channelId: string, attributes: Partial<OutgoingChannelData>): Promise<void> {
    const key = this.getKey(channelId)
    const currentData = await redis.get(key)
    const newData = currentData ? merge(JSON.parse(currentData), attributes) : attributes
    await redis.setex(key, this.ttl, JSON.stringify(newData))
  }

  public async get(channelId: string): Promise<OutgoingChannelData> {
    const key = this.getKey(channelId)
    const data = await redis.get(key)
    return data ? JSON.parse(data) : null
  }

  public async remove(channelId: string): Promise<any> {
    const key = this.getKey(channelId)
    return await redis.del(key)
  }

  private getKey(channelId: string): string {
    return `${this.prefix}:${channelId}`
  }
}

export default Storage
export { OutgoingChannelData }
