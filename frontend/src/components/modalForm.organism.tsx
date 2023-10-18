import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useModal } from '../context/modalContext';
import { useEffect, useState } from 'react';
import ApiAdapter from '../infra/api.adapter';
import { CreateContactCaseImpl } from '../data/useCases/classes/createContact.caseImpl';
import { Contact, ContactDTO } from '../domain/Contact';
import { UpdateContactCaseImpl } from '../data/useCases/classes/updateContact.caseImpl';


const ModalFormOrganism: React.FC = () => {
  const apiAdapter = new ApiAdapter<ContactDTO | Contact,Promise<Contact>>(new URL('http://localhost:3000/api'));
  const createContactCase = new CreateContactCaseImpl(apiAdapter);
  const updateContactCase = new UpdateContactCaseImpl(apiAdapter);

  const queryClient = useQueryClient()


  const { isModalOpen, closeModal, modalData } = useModal();

  const mutation = useMutation({
    mutationFn: (contact: ContactDTO) => modalData !== undefined ? updateContactCase.execute({...contact, id: modalData.id}) : createContactCase.execute(contact),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
      setFormData({
        name: '',
        lastName: '',
        phone: ''
      })
      closeModal()
    },
  })

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phone: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.name === 'phone' && event.target.value.length > 9) return
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  useEffect(() => {
    if(modalData){
      setFormData({
        name: modalData.name,
        lastName: modalData.lastName,
        phone: modalData.phone
      })
    }else{
      setFormData({
        name: '',
        lastName: '',
        phone: ''
      })
    }
  }, [modalData])

  return(
    <StyledModal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
    >
      <StyledBox>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalData ? 'Edit Contact' : 'Add Contact'}
        </Typography>
        <TextField
          required
          value={formData.name}
          name={'name'}
          onChange={handleChange}
          label="Name"
          variant="outlined"
        />
        <TextField
          required
          value={formData.lastName}
          name={'lastName'}
          onChange={handleChange}
          label="Last Name"
          variant="outlined"
        />
        <TextField
          required
          value={formData.phone}
          name={'phone'}
          onChange={handleChange}
          label="Phone Number"
          inputProps={{
            type: "number",
          }}
          variant="outlined"
        />
        <StyledButton
          variant="contained"
          disabled={formData.name === '' || formData.lastName === '' || formData.phone === ''}
          onClick={
            () => {
              mutation.mutate(formData)
            }
          }
        >
          <b>Save</b>
        </StyledButton>
        <StyledButtonCancel
          variant="contained"
          onClick={closeModal}
        >
          <b>Cancel</b>
        </StyledButtonCancel>
      </StyledBox>
    </StyledModal>
  )
}

export default ModalFormOrganism

const StyledModal = styled(Modal)`
`

const StyledBox = styled(Box)`
  width: 60%;
  min-height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
  transform: translate(-50%, -50%);
  background-color:  #fff;
  border-radius: 16px;
`

const StyledButton = styled(Button)`
  text-transform: none !important;
  font-size: 16px !important;
`

const StyledButtonCancel = styled(Button)`
  text-transform: none !important;
  font-size: 16px !important;
  background-color: #ff0000 !important;
`