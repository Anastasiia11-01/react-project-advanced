import React, { useState } from "react";
import { Center, Text, Box, Button } from "@chakra-ui/react";
import { DeleteRedirect } from "../ui/DeleteRedirect";

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
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [deleted, setDeleted] = useState(false); // State to track if the event is deleted

  const handleClick = () => {
    if (eventId === 1) {
      alert("Deleting of Event ID 1 is not allowed");
      console.log("Deleting of Event ID 1 not allowed");
      return; // Prevent deletion of Event ID 1
    }
    setConfirmVisible(true);
  };

  const handleConfirm = () => {
    deleteEvent(eventId, onDelete); // Call the deleteEvent function with parameters
    setDeleted(true); // Set deleted state to true after successful deletion
    setConfirmVisible(false);
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  const handleRedirect = () => {
    window.location.href = "/"; // Redirect to home page
  };

  return (
    <Center>
      {confirmVisible ? (
        <Box bg="black" color="white" p={4} borderRadius="md">
          <Text mb={2}>Are you sure you want to delete this event?</Text>
          <Button colorScheme="red" mr={2} onClick={handleConfirm}>
            Yes
          </Button>
          <Button colorScheme="blue" onClick={handleCancel}>
            No
          </Button>
        </Box>
      ) : (
        <>
          {deleted && (
            <DeleteRedirect
              onRedirect={handleRedirect}
              message="Event deleted successfully."
            />
          )}
          <Text onClick={handleClick} disabled={eventId === 1} cursor="pointer">
            Delete
          </Text>
        </>
      )}
    </Center>
  );
};
