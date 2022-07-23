import { useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { createSearchParams, useNavigate } from 'react-router-dom';

const SearchModal = ({ showSearchModal, setSearchModal }) => {
  let navigate = useNavigate();
  const [modId, setModId] = useState('');
  const [profName, setProfName] = useState('');
  const [authorName, setAuthorName] = useState('');

  const handleCloseSearch = () => setSearchModal(false);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleCloseSearch();
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({
        'mod-id': modId,
        'prof-name': profName,
        'author-name': authorName
      })}`
    });
    setModId('');
    setProfName('');
    setAuthorName('');
  };

  return (
    <>
      <Modal
        className="search-modal"
        show={showSearchModal}
        onHide={handleCloseSearch}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3>NotesNow</h3>
          <br></br>
          <h3>What are you looking for today?</h3>
          <Form onSubmit={handleSubmitSearch}>
            <FloatingLabel label="Module Code" className="my-3">
              <Form.Control
                type="text"
                placeholder="Module Code"
                value={modId}
                onChange={(e) => setModId(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label="Name of Professor" className="my-3">
              <Form.Control
                type="text"
                placeholder="Name of Professor"
                value={profName}
                onChange={(e) => setProfName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label="Author's Email Address" className="my-3">
              <Form.Control
                type="text"
                placeholder="Author's Email Address"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </FloatingLabel>
            <Button
              variant=""
              className="search-form-button"
              onClick={handleSubmitSearch}
              type="submit"
            >
              Search!
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SearchModal;
