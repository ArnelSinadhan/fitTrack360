import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import AddWorkout from "./AddWorkout";
import Swal from "sweetalert2";

export default function WorkoutView() {
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [workoutToEdit, setWorkoutToEdit] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/workouts/getMyWorkouts`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );

        setWorkouts(response.data.workouts || []);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  const handleEdit = (workout) => {
    setWorkoutToEdit(workout);
    setShowModal(true);
  };

  const handleClose = () => {
    setWorkoutToEdit(null);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/workouts/deleteWorkout/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      setWorkouts(workouts.filter((workout) => workout._id !== id));
      Swal.fire({
        title: "Deleted!",
        icon: "success",
        text: "Workout deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting workout:", error);
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "An error occurred while deleting the workout.",
      });
    }
  };

  const handleComplete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/workouts/completeWorkoutStatus/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      setWorkouts(
        workouts.map((workout) =>
          workout._id === id ? { ...workout, status: "completed" } : workout
        )
      );

      Swal.fire({
        title: "Success!",
        icon: "success",
        text: "Workout marked as complete.",
      });
    } catch (error) {
      console.error("Error marking workout as complete:", error);
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "An error occurred while marking the workout as complete.",
      });
    }
  };

  const handleWorkoutAdded = (newWorkout) => {
    if (workoutToEdit) {
      setWorkouts(
        workouts.map((workout) =>
          workout._id === newWorkout._id ? newWorkout : workout
        )
      );
    } else {
      setWorkouts([...workouts, newWorkout]);
    }
    setWorkoutToEdit(null); // Clear workoutToEdit after adding/updating
  };

  return (
    <Container className="mt-5">
      <Button className="addWorkoutBtn" onClick={() => setShowModal(true)}>
        Add Workout
      </Button>
      <AddWorkout
        workoutToEdit={workoutToEdit}
        onHide={handleClose}
        show={showModal}
        onWorkoutAdded={handleWorkoutAdded}
      />
      <h5 className="mt-5">Your Workouts</h5>
      <Row className="mt-4">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <Col key={workout._id} md={4} className="mb-4">
              <Card>
                <div className="iconWrapper">
                  <i
                    className="fa-regular fa-pen-to-square"
                    onClick={() => handleEdit(workout)}></i>
                  <i
                    className="fa-regular fa-trash-can"
                    onClick={() => handleDelete(workout._id)}></i>
                </div>

                <Card.Body>
                  <Card.Title>{workout.name}</Card.Title>
                  <Card.Text>Duration: {workout.duration} minutes</Card.Text>
                </Card.Body>
                <Card.Footer className="statusWrapper">
                  <Card.Text>Status: {workout.status}</Card.Text>
                  {workout.status !== "completed" && (
                    <Button
                      className="completeBtn"
                      onClick={() => handleComplete(workout._id)}>
                      Complete
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <p>No workouts found.</p>
        )}
      </Row>
    </Container>
  );
}
