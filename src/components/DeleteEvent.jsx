import React from "react";
import { Center, Text } from "@chakra-ui/react";

// Define deleteEvent function outside the component
const deleteEvent = (eventId, onDelete) => {
  fetch(`http://localhost:3000/events/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Event deleted successfully");
        onDelete(eventId); // Update UI after deletion
      } else {
        console.error("Failed to delete event");
      }
    })
    .catch((error) => {
      console.error("Error deleting event:", error.message);
    });
};

export const DeleteEvent = ({ eventId, onDelete }) => {
  const handleClick = () => {
    if (eventId === 1) {
      alert("Deleting of Event ID 1 is not allowed");
      console.log("Deleting of Event ID 1 not allowed");
      return; // Prevent deletion of Event ID 1
    }
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      deleteEvent(eventId, onDelete); // Call the deleteEvent function with parameters
      alert("Event deleted.");
    }
  };

  return (
    <Center>
      <Text onClick={handleClick} disabled={eventId === 1} cursor="pointer">
        Delete
      </Text>
    </Center>
  );
};
