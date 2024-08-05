import { Button, Col, Container, Row } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../authContext";
import WorkoutView from "./WorkoutView";

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Container className="mt-5 home">
      {isAuthenticated ? (
        <>
          <h1 className="mt-5 text-center dashboardHeading">
            Workout Dashboard
          </h1>
          <WorkoutView />
        </>
      ) : (
        <Row className="align-items-center justify-content-center">
          <Col lg={6}>
            <img src="/banner.png" alt="" className="img-fluid" />
          </Col>
          <Col
            lg={6}
            className="d-flex align-items-center justify-content-center flex-column">
            <h1 className="text-center bannerHeadings">
              WELCOME TO FITRACK 360°
            </h1>
            <Button
              className="getStarted mt-3"
              onClick={() => navigate("/register")}>
              Get Started
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}
