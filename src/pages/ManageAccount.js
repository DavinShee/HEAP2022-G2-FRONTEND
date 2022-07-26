import axios from 'axios';
import { useContext, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { databaseURLs } from '../URLConstants';
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

const ManageAccount = () => {
  const { user } = useContext(UserContext);
  let navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertDetails, setAlertDetails] = useState({
    variant: '',
    message: ['']
  });

  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setChangePasswordForm((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const requestHeader = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PATCH',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };

    if (
      changePasswordForm.newPassword !== changePasswordForm.confirmNewPassword
    ) {
      setAlertDetails({
        variant: 'danger',
        message: [
          'New password and confirm password do not match!',
          'Please try again.'
        ]
      });
      setShowAlert(true);
    } else if (
      changePasswordForm.newPassword === changePasswordForm.currentPassword
    ) {
      setAlertDetails({
        variant: 'danger',
        message: [
          'Current password is the same as new password!',
          'Please use a different password.'
        ]
      });
      setShowAlert(true);
    } else {
      axios
        .patch(
          databaseURLs.passwordUpdate,
          JSON.stringify({
            email: user.email,
            fullname: user.fullname,
            password: changePasswordForm.currentPassword,
            newPassword: changePasswordForm.newPassword
          }),
          { headers: requestHeader }
        )
        .then((_response) => {
          setAlertDetails({
            variant: 'success',
            message: [
              'Password successfully changed!!',
              'Redirecting to homepage in 3 seconds'
            ]
          });
          setShowAlert(true);
          setTimeout(() => {
            navigate({ pathname: '/' });
          }, 3000);
        })
        .catch((_error) => {
          setAlertDetails({
            variant: 'danger',
            message: ['Failed to change password. Please try again later.']
          });
          setShowAlert(true);
        });
    }

    setChangePasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
  };

  return (
    <div className="manage-account">
      <Container>
        <h1>Change Password</h1>
        {showAlert && (
          <Alert key={alertDetails.variant} variant={alertDetails.variant}>
            {alertDetails.message.map((line, index) => (
              <p style={{ marginBottom: 0, textAlign: 'center' }} key={index}>
                {line}
              </p>
            ))}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="currentPassword">
            <Form.Label column>Current Password</Form.Label>
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                name="currentPassword"
                onChange={handleChange}
                value={changePasswordForm.currentPassword}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="newPassword">
            <Form.Label column>New Password</Form.Label>
            <Col>
              <Form.Control
                type="password"
                placeholder="New Password"
                name="newPassword"
                onChange={handleChange}
                value={changePasswordForm.newPassword}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="confirmPassword">
            <Form.Label column>Confirm new password</Form.Label>
            <Col>
              <Form.Control
                type="password"
                placeholder="New Password"
                name="confirmNewPassword"
                onChange={handleChange}
                value={changePasswordForm.confirmNewPassword}
              />
            </Col>
          </Form.Group>
          <Row>
            <Button type="submit">Change Password!</Button>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default ManageAccount;
