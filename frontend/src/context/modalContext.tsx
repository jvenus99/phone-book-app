import { createContext, useContext, ReactNode, useState } from 'react';
import { Contact } from '../domain/Contact';

interface ModalContextType {
  isModalOpen: boolean;
  openModal: (data?: Contact) => void;
  closeModal: () => void;
  modalData?: Contact;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Contact | undefined>(undefined);

  const openModal = (data?: Contact) => {
    setIsModalOpen(true);
    if(data){
      setModalData(data);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(undefined);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, modalData }}>
      {children}
    </ModalContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
