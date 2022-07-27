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
          {/* <ReactLoading className="bars-loading" type="bars" color="black" /> */}
          <img
            src={`https://i.pinimg.com/originals/66/89/dc/6689dc331be27e66349ce9a4d15ddff3.gif`}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
