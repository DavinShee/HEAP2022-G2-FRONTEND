import React from 'react';
import { Modal } from 'react-bootstrap';

const LoadingModal = ({ loadingPage }) => {
  return (
    <Modal className="forms" show={loadingPage} centered>
      <Modal.Body>
        <div className="loading-text-container">
          <h2>Please wait as we process your request.</h2>
        </div>
        <div className="bars-container">
          <img
            src={`https://i.pinimg.com/originals/66/89/dc/6689dc331be27e66349ce9a4d15ddff3.gif`}
            alt="loading"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
