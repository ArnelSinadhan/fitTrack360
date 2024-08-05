import React, { useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        { email, password }
      );

      if (response.data.message === "Email and password do not match") {
        Swal.fire({
          title: "Oops!",
          icon: "error",
          text: "Email and password do not match",
        });
      } else {
        login(response.data.access); // Update context
        setEmail("");
        setPassword("");

        Swal.fire({
          title: "Success!",
          icon: "success",
          text: "Successfully logged in",
        });

        navigate("/"); // Redirect to the home page or dashboard after login
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <Container className="mt-5 logIn">
      <Form className="loginForm" onSubmit={loginUser}>
        <h1>Log in</h1>
        <Form.Group className="my-5">
          <Form.Control
            type="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-5 logInBtn" type="submit">
          Log in
        </Button>
      </Form>
    </Container>
  );
}
