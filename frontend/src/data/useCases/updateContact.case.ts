
import { Contact } from '../../domain/Contact'
import UseCase from './useCase'

export type UpdateContactCaseInput = Contact

export type UpdateContactCaseOutput = Promise<Contact>

export interface UpdateContactCase extends UseCase<UpdateContactCaseInput, UpdateContactCaseOutput> {
  execute(params: UpdateContactCaseInput): UpdateContactCaseOutput
}