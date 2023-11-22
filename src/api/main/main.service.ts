import Storage from "@scopes/talker/storage"

import type { StatResponse } from "./main.interface"

class MainService {
  private talkerStorage = new Storage()

  public async getStats(): Promise<StatResponse> {
    const response = await this.talkerStorage.getCount()

    return {
      contacts: response || 0
    }
  }
}

export default MainService
