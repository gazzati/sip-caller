import config from "@root/config"

import Api from "./api"

class Ari {
  private app = config.ari.app
  readonly api = new Api()

  public async getChannels(): Promise<Array<any>> {
    return await this.api.get("/channels")
  }

  public async getChannelDetails(channelId: string): Promise<any> {
    return await this.api.get(`/channels/${channelId}`)
  }

  public async createChannel(
    endpoint = "",
    channelId: string,
    variables?: { [key: string]: string }
  ): Promise<any> {
    return await this.api.post(`/channels/create?endpoint=${endpoint}&app=${this.app}`, {
      formats: "ulaw,alaw",
      channelId,
      variables
    })
  }

  public async removeChannel(channelId: string, reason?: string): Promise<any> {
    try {
      return await this.api.delete(`/channels/${channelId}?${reason ? `reason=${reason}` : ""}`)
    } catch {}
  }

  public async createBridge(bridgeId: string): Promise<any> {
    return await this.api.post(`/bridges?bridgeId=${bridgeId}&type=mixing`)
  }

  public async addChannelsToBridge(bridgeId: string, channels: Array<string>): Promise<void | Error> {
    for (const channel of channels) {
      await this.api.post(`/bridges/${bridgeId}/addChannel?channel=${channel}`)
    }
  }

  public async removeChannelsFromBridge(bridgeId: string, channels: Array<string>): Promise<void> {
    try {
      for (const channel of channels) {
        await this.api.post(`/bridges/${bridgeId}/removeChannel?channel=${channel}`)
      }
    } catch {}
  }

  public async answer(channelId: string) {
    return await this.api.post(`/channels/${channelId}/answer`)
  }

  public async dial(channelId: string, timeout = 1000) {
    return await this.api.post(`/channels/${channelId}/dial?timeout=${timeout}`)
  }
}

export default Ari
