export interface IpResponse {
  ip: string
}

export interface GetIp {
  Headers: {
    "real-ip": string
  }
  Reply: IpResponse
}

export interface StatResponse {
  contacts: number
}
