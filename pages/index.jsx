import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FaGoogle, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validate = () => {
    const errs = {};
    if (!email) errs.email = "Email is required";
    if (!/^.{8,}$/.test(password))
      errs.password = "Password must be at least 8 characters";
    else if (!/[A-Z]/.test(password))
      errs.password = "Must have at least one uppercase letter";
    else if (!/\d/.test(password))
      errs.password = "Must have at least one number";
    else if (!/[^\w\s]/.test(password))
      errs.password = "Must have at least one symbol";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) router.push("/home");
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center px-0 bg-white">
      <Row className="w-100 gx-0">
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center px-5"
        >
          <div style={{ maxWidth: 400, width: "100%" }}>
            <h3 className="fw-bold text-dark mb-2">Sign In</h3>
            <p
              className="text-muted fw-bold mb-4"
              style={{ fontSize: "0.9rem" }}
            >
              New user?{" "}
              <a href="#" className="text-primary text-decoration-none">
                Create an account
              </a>
            </p>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Username or email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                  className="border border-dark-subtle rounded-0"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                  className="border border-dark-subtle rounded-0"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex align-items-center mb-3">
                <Form.Check
                  type="checkbox"
                  id="keepSignedIn"
                  label="Keep me signed in"
                  className="me-2"
                />
              </div>

              <Button
                type="submit"
                className="w-100"
                style={{
                  backgroundColor: "#333",
                  border: "none",
                  fontWeight: 500,
                }}
              >
                Sign In
              </Button>
            </Form>

            <div className="d-flex align-items-center my-4">
              <div
                className="flex-grow-1"
                style={{ height: 1, backgroundColor: "#ccc" }}
              ></div>
              <div
                className="px-2 text-muted small"
                style={{
                  whiteSpace: "nowrap",
                  backgroundColor: "#fff",
                  transform: "translateY(-6px)",
                }}
              >
                Or Sign In With
              </div>
              <div
                className="flex-grow-1"
                style={{ height: 1, backgroundColor: "#ccc" }}
              ></div>
            </div>

            <div className="d-flex justify-content-center gap-3">
              {[FaGoogle, FaFacebookF, FaLinkedinIn, FaTwitter].map(
                (Icon, idx) => (
                  <div
                    key={idx}
                    className="d-flex align-items-center justify-content-center border border-dark rounded-circle"
                    style={{
                      width: 38,
                      height: 38,
                      cursor: "pointer",
                    }}
                  >
                    <Icon size={16} className="text-dark" />
                  </div>
                )
              )}
            </div>
          </div>
        </Col>

        <Col
          md={6}
          className="d-none d-md-flex justify-content-center align-items-center bg-white"
        >
          <img
            src="/images/login.svg"
            alt="Sign In Illustration"
            style={{ maxWidth: "65%", objectFit: "contain" }}
          />
        </Col>
      </Row>
    </Container>
  );
}
