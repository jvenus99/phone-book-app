
import { Contact } from '../../domain/Contact'
import UseCase from './useCase'

export type GetContactCaseInput = {
  lastName?: string
}

export type GetContactCaseOutput = Promise<Array<Contact>>

export interface GetContactCase extends UseCase<GetContactCaseInput, GetContactCaseOutput> {
  execute(params: GetContactCaseInput): GetContactCaseOutput
}