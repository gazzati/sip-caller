import axios from "axios"

import config, { Env } from "@root/config"
import Logger, { Service } from "@root/services/logger"

import type { AxiosInstance, AxiosError } from "axios"

interface Error extends AxiosError<{ message?: string }> {}

class Api {
  private base =
    config.env === Env.Production
      ? `http://${config.ari.host}:${config.ari.port}/ari`
      : `https://${config.ari.host}/ari`
  private auth = { username: config.ari.user, password: config.ari.password }

  private logger = new Logger(Service.Processor)

  readonly instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: this.base,
      timeout: 10_000,
      auth: this.auth,
      headers: {
        Accept: "application/json"
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
      //throw error as AxiosError
      console.error(error)
    }
  }

  public async post(url: string, body?: any): Promise<any> {
    try {
      const response = await this.instance.post(url, body)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  public async delete(url: string): Promise<any> {
    try {
      const response = await this.instance.delete(url)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  private errorHandler() {
    this.instance.interceptors.response.use(
      response => response,
      e => {
        const error = e as Error

        if (error?.response?.data?.message?.includes("Auth")) {
          this.logger.error(error.response.data.message)
        }

        return Promise.reject(error)
      }
    )
  }
}

export default Api
