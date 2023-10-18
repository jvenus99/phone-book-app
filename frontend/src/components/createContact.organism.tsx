import { Button, InputAdornment, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import styled from "styled-components";
import { useModal } from "../context/modalContext";
import ApiAdapter from "../infra/api.adapter";
import { GetContactCaseImpl } from "../data/useCases/classes/getContacts.caseImpl";
import { Contact } from "../domain/Contact";
import { useQuery } from '@tanstack/react-query';
import { GetContactCaseInput } from "../data/useCases/getContacts.case";
import { useState } from "react";

const CreateContactOrganism: React.FC = () => {
  const apiAdapter = new ApiAdapter<GetContactCaseInput,Promise<Array<Contact>>>(new URL('http://localhost:3000/api'));
  const getContactCase = new GetContactCaseImpl(apiAdapter);

  const query = useQuery({ queryKey: ['contacts'], queryFn: () => getContactCase.execute({lastName}) });

  const [lastName, setLastName] = useState('');

  const { openModal } = useModal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLastName(value);
    setTimeout(() => {
      query.refetch()
    }, 500);
  }

  return (
    <StyledContainer>
      <StyledHeader>
        <h2>Contacts</h2>
        <StyledButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => openModal()}
        >
          <b>Add Contact</b>
        </StyledButton>
      </StyledHeader>
      <TextField
        id="input-with-icon-textfield"
        label="Search for contact by last name"
        fullWidth
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
    </StyledContainer>
  );
}

export default CreateContactOrganism;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 15px 0;
`

const StyledButton = styled(Button)`
  text-transform: none !important;
  font-size: 16px !important;
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 50px;
  align-items: center;
  margin: 15px 0;
`