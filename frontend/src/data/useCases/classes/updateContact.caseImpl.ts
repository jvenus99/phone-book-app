import { ContactDTO } from "../../../domain/Contact"
import { ApiPort } from "../../port/api.port"
import { UpdateContactCase, UpdateContactCaseInput, UpdateContactCaseOutput } from "../updateContact.case"

export type ApiUpdateContactRequestBody = ContactDTO

export type ApiUpdateContactResponseBody = UpdateContactCaseOutput

export class UpdateContactCaseImpl implements UpdateContactCase {
  constructor(
    private readonly api: ApiPort<
      ApiUpdateContactRequestBody,
      ApiUpdateContactResponseBody
    >
  ) {}

  async execute(params: UpdateContactCaseInput): UpdateContactCaseOutput {
    try{
      const response = await this.api.request({
        urlPath: `/users/${params.id}`,
        method: 'PUT',
        body: params
      })
      return response.body
    }catch(e){
      console.log(e)
      throw e
    }
  }

}