
import UseCase from './useCase'

export type DeleteContactCaseInput = number

export type DeleteContactCaseOutput = Promise<{ message: string }>

export interface DeleteContactCase extends UseCase<DeleteContactCaseInput, DeleteContactCaseOutput> {
  execute(params: DeleteContactCaseInput): DeleteContactCaseOutput
}