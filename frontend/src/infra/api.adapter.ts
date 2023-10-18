import { HttpRequest, HttpResponse } from '../domain/Api'

import { ApiPort } from '../data/port/api.port'

import axios, { AxiosResponse } from 'axios'

export default class ApiAdapter<RequestBody = unknown, ResponseBody = unknown>
  implements ApiPort<RequestBody, ResponseBody>
{
  constructor(private baseURL?: URL) {}

  async request(
    params: HttpRequest<RequestBody>
  ): Promise<HttpResponse<ResponseBody>> {
    let axiosResponse: AxiosResponse<ResponseBody>

    try {
      axiosResponse = await axios.request({
        baseURL: this.baseURL?.toString(),
        url: params.urlPath,
        method: params.method,
        data: params.body,
      })
    } catch (e) {
      console.log(e)
      throw e
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
      headers: axiosResponse.headers,
    }
  }
}