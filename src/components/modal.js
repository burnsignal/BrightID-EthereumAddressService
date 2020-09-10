import React, { useState } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalPopup = (props) => {
  const {
    isActive
  } = props;

  const [modal, setModal] = useState(isActive);

  const toggle = () => setModal(!modal);

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>BrightID</ModalHeader>
      <ModalBody>
        Connect BrightID today :)
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Hello</Button>{' '}
        <Button color="secondary" onClick={toggle}>Goodbye</Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalPopup;
