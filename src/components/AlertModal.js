import React from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AlertModal = ({ alertMsg, sendHomePage, setShowAlert, showAlert }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    setShowAlert(false)
  }
  console.log(sendHomePage)
  console.log(showAlert)

  if (sendHomePage) {
    setTimeout(() => {
      // alertPage = false; do we need to close modal?
      navigate('/');
    }, 3000);
  }
  if (sendHomePage) {
    return (
      <Modal className="forms" show={showAlert} centered>
        <Modal.Body>
          <div className="loading-text-container">
            <h2>{alertMsg}</h2>
            <h5>You will be redirected to the home page in 3 seconds...</h5>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
  if (sendHomePage===false) {
    return (
      <Modal
        className="forms"
        show={showAlert}
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="loading-text-container">
            <h2>{alertMsg}</h2>
            <h5>Please try again.</h5>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
};

export default AlertModal;