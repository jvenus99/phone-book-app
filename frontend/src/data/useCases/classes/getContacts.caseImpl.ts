import { ApiPort } from "../../port/api.port"
import { GetContactCase, GetContactCaseInput, GetContactCaseOutput } from "../getContacts.case"

export type ApiGetContactsRequestBody = GetContactCaseInput

export type ApiGetContactsResponseBody = GetContactCaseOutput

export class GetContactCaseImpl implements GetContactCase {
  constructor(
    private readonly api: ApiPort<
      ApiGetContactsRequestBody,
      ApiGetContactsResponseBody
    >
  ) {}

  async execute(params: GetContactCaseInput): GetContactCaseOutput {
    try{
      const response = await this.api.request({
        urlPath: `/users?${params.lastName ? `lastName=${params.lastName}` : null}`,
        method: 'GET',
      })
      return response.body
    }catch(e){
      console.log(e)
      throw e
    }
  }

}