import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import ApiAdapter from '../infra/api.adapter';
import { DeleteContactCaseImpl } from '../data/useCases/classes/deleteContact.caseImpl';

type Props = {
  contactId: number;
  isModalOpen: boolean;
  closeModal: () => void;
}


const ModalDeleteOrganism: React.FC<Props> = (props: Props) => {
  const apiAdapter = new ApiAdapter<number,Promise<{ message: string}>>(new URL('http://localhost:3000/api'));
  const deleteContactCase = new DeleteContactCaseImpl(apiAdapter);

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (contactId : number) => deleteContactCase.execute(contactId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
    },
  })

  return(
    <StyledModal
      open={props.isModalOpen}
      onClose={props.closeModal}
      aria-labelledby="modal-modal-title"
    >
      <StyledBox>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure that you want delete the contact?
        </Typography>
          <StyledButton
            variant="contained"
            onClick={
              () => mutation.mutate(props.contactId)
            }
          >
            <b>Yes</b>
          </StyledButton>
          <StyledButtonCancel
            variant="contained"
            onClick={props.closeModal}
          >
            <b>No</b>
          </StyledButtonCancel>
      </StyledBox>
    </StyledModal>
  )
}

export default ModalDeleteOrganism

const StyledModal = styled(Modal)`
`

const StyledBox = styled(Box)`
  width: 60%;
  min-height: 200px;
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