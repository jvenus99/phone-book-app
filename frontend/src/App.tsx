import styled from 'styled-components';
import ContactsIcon from '@mui/icons-material/Contacts';
import ContactCardOrganism from './components/contactCard.organism';
import CreateContactOrganism from './components/createContact.organism';
import { ModalProvider } from './context/modalContext';
import ModalFormOrganism from './components/modalForm.organism';
import ApiAdapter from './infra/api.adapter';
import { Contact } from './domain/Contact';
import { GetContactCaseImpl } from './data/useCases/classes/getContacts.caseImpl';
import { useQuery } from '@tanstack/react-query';
import { GetContactCaseInput } from './data/useCases/getContacts.case';


const App: React.FC = () => {
  const apiAdapter = new ApiAdapter<GetContactCaseInput,Promise<Array<Contact>>>(new URL('http://localhost:3000/api'));
  const getContactCase = new GetContactCaseImpl(apiAdapter);

  const query = useQuery({ queryKey: ['contacts'], queryFn: () => getContactCase.execute({}) });


  return (
    <ModalProvider>
      <StyledHeader>
        <ContactsIcon sx={{ fontSize: 60 }} />
        <h2>Phone Book App</h2>
      </StyledHeader>
      <CreateContactOrganism />
      <StyledList>
        {query.data?.map((contact: Contact) => (
          <ContactCardOrganism key={contact.id} contact={contact} />
        ))}
      </StyledList>
      <ModalFormOrganism />
    </ModalProvider>
  );
}

export default App;

const StyledHeader = styled.header`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;

  h2 {
      margin-left: 15px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 20px;
    text-align: center;

    h2 {
      font-size: 1.5rem;
      margin-top: 10px;
    }
  }
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 25px 0 0;
  width: 100%;
  li {
    &:first-child {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    &:last-child{
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;
