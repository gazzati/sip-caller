
export type City = {
  id: number
  title: string
  area?: string
  country?: string
  region?: string
  important?: number
}

export type CityVkResponse = {
  response: {
    count: number
    items: Array<City>
  }
}

export interface GetCities {
  Querystring: {
    search: string
  }
  Reply: {
    cities: Array<City>
  }
}

