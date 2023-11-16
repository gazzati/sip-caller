import redis from "@database/redis"

import { TalkerChannelData } from "@interfaces/talker"

class Storage {
  private readonly prefix = "talker"
  private readonly ttl = 21600

  public async save(channelId: string, attributes: TalkerChannelData): Promise<void> {
    await redis.setex(`${this.prefix}:${channelId}`, this.ttl, JSON.stringify(attributes))
  }

  public async get(channelId: string): Promise<TalkerChannelData> {
    const data = await redis.get(`${this.prefix}:${channelId}`)
    return data ? JSON.parse(data) : null
  }

  public async remove(channelId: string): Promise<any> {
    return await redis.del(`${this.prefix}:${channelId}`)
  }

  public async addTalkerPendingChannel(channelId: string): Promise<void> {
    await redis.rpush("talker-channels", channelId)
  }

  public async removeTalkerPendingChannel(channelId: string): Promise<void> {
    await redis.lrem("talker-channels", -1, channelId)
  }

  public async getTalkerPendingChannels(): Promise<Array<string>> {
    return await redis.lrange("talker-channels", 0, -1) || []
  }
}

export default Storage
export { TalkerChannelData }
