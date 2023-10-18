import styled from "styled-components";
import PhoneIcon from '@mui/icons-material/Phone';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Contact } from '../domain/Contact';
import ModalDeleteOrganism from "./modalDelete.organism";
import { useState } from "react";
import { useModal } from "../context/modalContext";

type Props = {
  contact: Contact;
}

const ContactCardOrganism: React.FC<Props> = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { openModal } = useModal();

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const formatPhoneNumber = (input: string): string =>  {
    const cleaned = input.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
    return formatted;
  }

  return (
    <StyledContainer>
      <StyledUserInfo>
        <h3>{props.contact.name} {props.contact.lastName}</h3>
        <span><PhoneIcon /> <b>{formatPhoneNumber(props.contact.phone)}</b></span>
      </StyledUserInfo>
      <StyledContainerButtons>
        <StyledButtonEdit variant="contained" onClick={
          () => openModal(props.contact)
        }>
          <ModeEditIcon />
        </StyledButtonEdit>
        <StyledButton onClick={
          () => setIsModalOpen(true)
        }>
          <DeleteIcon />
        </StyledButton>
      </StyledContainerButtons>
      <ModalDeleteOrganism contactId={props.contact.id} isModalOpen={isModalOpen} closeModal={closeModal} />
    </StyledContainer>
  );
}

export default ContactCardOrganism;

const StyledContainer = styled.li`
  width: 100%;
  height: 100%;
  padding: 10px 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #a19f9f;
`

const StyledUserInfo = styled.div`
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  h3 {
    font-size: 24px;
    margin: 5px;
  }
  span {
    color: #a19f9f;
    display: flex;
    align-items: center;
    font-size: 15px;
    svg {
      margin-right: 5px;
    }
  }
`

const StyledContainerButtons = styled.div`
  display: flex;
  align-items: center;
`

const StyledButton = styled(Button)`
  margin-right: 15px !important;
  background-color: #ff0000 !important;
  color: #fff !important;
  width: 50px;
  height: 50px;
  border-radius: 16px;
`

const StyledButtonEdit = styled(Button)`
  margin-right: 15px !important;
  color: #fff !important;
  width: 50px;
  height: 50px;
  border-radius: 16px;
`