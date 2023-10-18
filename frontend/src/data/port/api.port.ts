import { HttpRequest, HttpResponse } from '../../domain/Api'

export interface ApiPort<
  RequestBody = unknown,
  ResponseBody = unknown,
  ResponseHeaders = unknown
> {
  request(
    httpRequest: HttpRequest<RequestBody>
  ): Promise<HttpResponse<ResponseBody, ResponseHeaders>>
}