import React from 'react';
import { Modal } from 'react-bootstrap';

import ReactLoading from 'react-loading';
const LoadingModal = ({ LoadingModal }) => {
  // LoadingModal = !LoadingModal;
  return (
    <Modal className="forms" show={LoadingModal} centered>
      <Modal.Body>
        <div className="loading-text-container">
          <h2>Please wait as we process your request.</h2>
        </div>
        <div className="bars-container">
          <ReactLoading className="bars-loading" type="bars" color="black" />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
