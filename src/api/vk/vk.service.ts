import fetch from 'node-fetch'

import config from "@root/config"

import type { City } from "./vk.interface"

class VkService {
  private baseUrl = `https://${config.vk.host}/method`

  public async getCities(search: string): Promise<Array<City>> {
    const { response } = await this.request("database.getCities", `count=5&need_all=0${search ? `&q=${search}` : ""}`)
    return response?.items || []
  }

  private async request(method: string, params?: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${method}?v=${config.vk.v}&access_token=${config.vk.token}${params ? `&${params}` : ""}`)
      return await response.json()
    } catch (error) {
      console.error(error)
      return []
    }
  }
}

export default VkService
