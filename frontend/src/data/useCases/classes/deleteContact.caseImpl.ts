import { ApiPort } from "../../port/api.port"
import { DeleteContactCase, DeleteContactCaseInput, DeleteContactCaseOutput } from "../deleteContact"

export type ApiDeleteContactRequestBody = number

export type ApiDeleteContactResponseBody = DeleteContactCaseOutput

export class DeleteContactCaseImpl implements DeleteContactCase {
  constructor(
    private readonly api: ApiPort<
      ApiDeleteContactRequestBody,
      ApiDeleteContactResponseBody
    >
  ) {}

  async execute(params: DeleteContactCaseInput): DeleteContactCaseOutput {
    try{
      const response = await this.api.request({
        urlPath: `/users/${params}`,
        method: 'DELETE',
      })
      return response.body
    }catch(e){
      console.log(e)
      throw e
    }
  }

}