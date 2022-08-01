
import React from "react";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <footer className={"footer" + (props.default ? " footer-default" : "")}>
      <Container fluid={props.fluid ? true : false}>
        <Row>
          <Col md={6}>
          <nav className="footer-nav">
            <ul>
              <li>
                <Link to="https://www.codersglobe.com" target="_blank">
                  Salon App
                </Link>
              </li>
              <li>
                <Link to="https://blog.creative-tim.com" target="_blank">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="https://www.creative-tim.com/license" target="_blank">
                  Licenses
                </Link>
              </li>
            </ul>
          </nav>
          </Col>
          <Col md={6}>
          <div className="credits ml-auto">
            <div className="copyright">
              &copy; {1900 + new Date().getYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by Coders Globe
            </div>
          </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
