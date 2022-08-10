import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Form, Row, Button, Col } from "react-bootstrap";
import "./login/login.css";
import logo from "./assets/img/Salon-Login-Logo.png";
import AdminLayout from "./layouts/Admin";
// User Login info
const loginApi = "http://51.68.167.212:3003/admin/log-in";

function App() {
  const [errorMessages, setErrorMessages] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Generate JSX code for error message
  const RenderErrorMessage = () => (
    <div className="error text-center">Invalid user name or password</div>
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    let item = { email, password };
    let result = await fetch(loginApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    // localStorage.setItem("user-info",JSON.stringify(result))

    if (result.error) {
      // Invalid password
      setErrorMessages(true);
    } else {
      setErrorMessages(false);
      setIsSubmitted(true);
    }
  };
  //  else {
  //   // Username not found
  //   setErrorMessages({ name: "email", message: errors.email });
  // }

  const renderForm = (
    <div className="app">
    <div className="login-form">
      <div className="d-flex justify-content-center">
        <img
          style={{ width: "55px", height: "50px" }}
          src={logo}
          alt="react-logo"
        />
      </div>
      <div className="title text-center">Sign In</div>
    <Form onSubmit={handleLogin}>
      <Row>
        <Col className="mb-3">
          <Form.Control
            className="p-2"
            type="text"
            name="email"
            required
            placeholder="username"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col className="mb-3">
          <Form.Control
            className="p-2"
            type="password"
            name="password"
            required
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col className="mb-3 d-grid">
          <Button variant="primary" size="md" type="submit">
            Login
          </Button>
          {errorMessages ? <RenderErrorMessage /> : ""}
        </Col>
      </Row>
    </Form>
    </div>
    </div>
  );

  return (
    <BrowserRouter>
      {isSubmitted ? (
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Redirect to="/admin/dashboard" />
        </Switch>
          ) : (
            renderForm
      )}
    </BrowserRouter>
  );
}

export default App;
