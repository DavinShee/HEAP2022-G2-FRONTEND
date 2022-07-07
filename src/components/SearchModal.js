import { useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ showSearchModal, setSearchModal }) => {
  let navigate = useNavigate();
  const [modID, setModID] = useState('');
  const [profName, setProfName] = useState('');
  const [authorName, setAuthorName] = useState('');

  const handleCloseSearch = () => setSearchModal(false);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleCloseSearch();
    navigate(
      `/search?mod-id=${modID}&prof-id=${profName}&author-name=${authorName}`
    );
    setModID('');
    setProfName('');
    setAuthorName('');
  };

  return (
    <>
      <Modal show={showSearchModal} onHide={handleCloseSearch} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3>What are you looking for today?</h3>
          <Form onSubmit={handleSubmitSearch}>
            <FloatingLabel label="Module" className="my-3">
              <Form.Control
                type="text"
                placeholder="Module"
                value={modID}
                onChange={(e) => setModID(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label="Prof" className="my-3">
              <Form.Control
                type="text"
                placeholder="Prof"
                value={profName}
                onChange={(e) => setProfName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label="Author" className="my-3">
              <Form.Control
                type="text"
                placeholder="Author"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </FloatingLabel>
            <Button variant="info" onClick={handleSubmitSearch} type="submit">
              Search!
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SearchModal;
