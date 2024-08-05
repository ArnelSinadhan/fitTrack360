import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function AddWorkout({
  workoutToEdit,
  onHide,
  show,
  onWorkoutAdded,
}) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (workoutToEdit) {
      setName(workoutToEdit.name);
      setDuration(workoutToEdit.duration);
    } else {
      setName("");
      setDuration("");
    }
  }, [workoutToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (workoutToEdit) {
        // Update workout
        const response = await axios.patch(
          `${import.meta.env.VITE_API_URL}/workouts/updateWorkout/${
            workoutToEdit._id
          }`,
          { name, duration },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );
        onWorkoutAdded(response.data.updatedWorkout);
        Swal.fire({
          title: "Success!",
          icon: "success",
          text: "Workout updated successfully.",
        });
      } else {
        // Add new workout
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/workouts/addWorkout`,
          { name, duration },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );
        onWorkoutAdded(response.data);
        setName("");
        setDuration("");
        Swal.fire({
          title: "Success!",
          icon: "success",
          text: "Workout added successfully.",
        });
      }
      onHide(); // Hide the modal
    } catch (error) {
      console.error("Error adding/updating workout:", error);
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "An error occurred while adding/updating the workout.",
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {workoutToEdit ? "Edit Workout" : "Add New Workout"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formWorkoutName">
            <Form.Label>Workout Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter workout name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formWorkoutDuration" className="mt-3">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter duration in minutes"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" className="closeBtn" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" type="submit" className="addWorkoutBtn">
              {workoutToEdit ? "Update Workout" : "Add Workout"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
