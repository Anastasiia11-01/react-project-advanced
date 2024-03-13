import React, { useState } from "react";
import {
  Input,
  Box,
  Button,
  FormControl,
  Heading,
  Center,
  Text,
} from "@chakra-ui/react";

export const EditEvent = ({ event }) => {
  const [updatedEvent, setUpdatedEvent] = useState({ ...event });
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (field, value) => {
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [field]: value !== "" ? value : prevEvent[field],
    }));
  };
  // Function to check if the image URL is complete
  const isCompleteURL = (url) => {
    return url.startsWith("http://") || url.startsWith("https://");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCompleteURL(updatedEvent.image)) {
      setMessage("Image URL is incomplete");
      return;
    }

    fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Update Successful!");
          alert("Event updated successfully!"); // Alert after successful update
          setUpdatedEvent({}); // Clear form fields after successful update
          setShowForm(false);
        } else {
          throw new Error("Failed to update event");
        }
      })
      .catch((error) => {
        setMessage("Error updating event: " + error.message);
      });
  };

  const handleCancel = () => {
    setShowForm(false);
    setMessage("");
    setUpdatedEvent({}); // Clear form fields after cancellation
  };

  return (
    <>
      {showForm ? (
        <Center>
          <Box bg="#1A365D" p="4" color="white" borderRadius="md">
            <>
              {message && <Text>{message}</Text>}
              <Heading pb={4}>Edit the Event</Heading>
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Title"
                    value={updatedEvent.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    color="white"
                    bg="#2A4365"
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Description"
                    value={updatedEvent.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="Image URL"
                    value={updatedEvent.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Category Id"
                    value={updatedEvent.categoryIds}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Location"
                    value={updatedEvent.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="datetime-local"
                    placeholder="Start"
                    value={updatedEvent.startTime}
                    min={new Date().toISOString().slice(0, 16)}
                    onChange={(e) =>
                      handleInputChange("startTime", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl mb={4}>
                  <Input
                    type="datetime-local"
                    placeholder="End"
                    value={updatedEvent.endTime}
                    min={updatedEvent.startTime}
                    onChange={(e) =>
                      handleInputChange("endTime", e.target.value)
                    }
                  />
                </FormControl>

                <Button type="submit" colorScheme="teal" mr={3}>
                  Save
                </Button>
                <Button type="button" onClick={handleCancel} colorScheme="red">
                  Cancel
                </Button>
              </form>
            </>
          </Box>
        </Center>
      ) : (
        <Center>
          <Text onClick={() => setShowForm(true)} cursor="pointer">
            Edit
          </Text>
        </Center>
      )}
    </>
  );
};
