import axios from "axios"

import config from "@root/config"
import logger from "@root/services/logger"

import type { AxiosInstance, AxiosError } from "axios"


interface Error extends AxiosError<{ message?: string }> {}

class Api {
  private base = `http://${config.ari.host}:${config.ari.port}/ari`
  private auth = { username: config.ari.user, password: config.ari.password }

  readonly instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: this.base,
      timeout: 10_000,
      auth:  this.auth,
      headers: {
        Accept: "application/json",
        // ...(options?.headers && options.headers)
      }
    })

    this.errorHandler()
  }

  public async get(url: string): Promise<any> {
    try {
      const response = await this.instance.get(url)
      return response.data
    } catch (error) {
      throw error as AxiosError
    }
  }

  public async post(url: string, body?: any): Promise<any> {
    try {
      const response = await this.instance.post(url, body)
      return response.data
    } catch (error) {
      throw error as AxiosError
    }
  }

  public async delete(url: string): Promise<any> {
    try {
      const response = await this.instance.delete(url)
      return response.data
    } catch (error) {
      throw error as AxiosError
    }
  }

  private errorHandler() {
    this.instance.interceptors.response.use(
      response => response,
      e => {
        const error = e as Error

        if (error?.response?.data?.message?.includes("Auth")) {
          logger.error(error.response.data.message)
        }

        return Promise.reject(error)
      }
    )
  }
}

export default Api
