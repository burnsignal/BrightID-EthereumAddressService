import React, { useState } from 'react';

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
        <ModalFooter>
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()} Bright Ethereum{" "}
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}
