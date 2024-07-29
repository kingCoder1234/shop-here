import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const { handleEmailVerification, verificationMessage } = useAuthContext();
  const navigate = useNavigate();

  const handleVerification = async (e) => {
    e.preventDefault();
    const success = await handleEmailVerification(verificationCode);
    if (success) {
      toast.success("Email Verified!");
      navigate("/login");
    }
  };

  return (
    <div className="verify-email-container">
      <h2>Email Verification</h2>
      <Form onSubmit={handleVerification}>
        <Form.Group controlId="formVerificationCode">
          <Form.Label>Verification Code</Form.Label>
          <Form.Control
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter your verification code"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Verify
        </Button>
      </Form>
      {verificationMessage && (
        <Alert
          variant={
            verificationMessage.includes("success") ? "success" : "danger"
          }
        >
          {verificationMessage}
        </Alert>
      )}
    </div>
  );
};

export default VerifyEmail;
