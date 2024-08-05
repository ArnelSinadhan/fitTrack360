import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        {
          fullName,
          email,
          password,
        }
      );

      if (response.data.message === "Registered Successfully") {
        setFullName("");
        setEmail("");
        setPassword("");
        Swal.fire({
          title: "Success!",
          icon: "success",
          text: "Registration successful",
        });

        navigate("/login");
      } else {
        Swal.fire({
          title: "Oops!",
          icon: "error",
          text: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <h1 className="text-center getStartedh1 mt-5">Get Started</h1>
        <Col
          lg={6}
          className="d-flex align-items-center justify-content-center">
          <Form className="regForm" onSubmit={registerUser}>
            <Form.Group>
              <Form.Label>Full Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Container className="d-block p-0">
              <Button className="mt-5 text-center regBtn" type="submit">
                Register
              </Button>
            </Container>
          </Form>
        </Col>

        <Col lg={6}>
          <img src="/banner.png" alt="" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
}
