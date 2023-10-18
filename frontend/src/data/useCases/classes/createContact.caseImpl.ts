import { ContactDTO } from "../../../domain/Contact"
import { ApiPort } from "../../port/api.port"
import { CreateContactCase, CreateContactCaseInput, CreateContactCaseOutput } from "../createContact.case"

export type ApiCreatePostRequestBody = ContactDTO

export type ApiCreatePostResponseBody = CreateContactCaseOutput

export class CreateContactCaseImpl implements CreateContactCase {
  constructor(
    private readonly api: ApiPort<
      ApiCreatePostRequestBody,
      ApiCreatePostResponseBody
    >
  ) {}

  async execute(params: CreateContactCaseInput): CreateContactCaseOutput {
    try{
      const response = await this.api.request({
        urlPath: `/users`,
        method: 'POST',
        body: params
      })
      return response.body
    }catch(e){
      console.log(e)
      throw e
    }
  }

}