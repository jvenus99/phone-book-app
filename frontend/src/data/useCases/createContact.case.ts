
import { Contact, ContactDTO } from '../../domain/Contact'
import UseCase from './useCase'

export type CreateContactCaseInput = ContactDTO

export type CreateContactCaseOutput = Promise<Contact>

export interface CreateContactCase extends UseCase<CreateContactCaseInput, CreateContactCaseOutput> {
  execute(params: CreateContactCaseInput): CreateContactCaseOutput
}