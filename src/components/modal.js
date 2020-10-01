import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function ModalWrapper({ children, active }) {
  const [modal, setModal] = useState(active);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className='modal-frame'>
        <ModalHeader toggle={toggle}>&nbsp;</ModalHeader>
         <ModalBody>
          {children}
        </ModalBody>
      </Modal>
    </div>
  );
}
