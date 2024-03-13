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

export const EventForm = ({ users, categories, events, createEvent }) => {
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Find user by name or create a new user
    let foundUser = users.find((user) => user.name === userName);
    let createdBy;
    if (!foundUser) {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: userName }),
        });
        if (response.ok) {
          const newUser = await response.json();
          createdBy = newUser.id;
        } else {
          setMessage("Failed to create user.");
          return;
        }
      } catch (error) {
        setMessage("Error creating user: " + error.message);
        return;
      }
    } else {
      createdBy = foundUser.id;
    }

    // Create new category if not found
    let foundCategory = categories.find(
      (category) => category.name === categoryName
    );
    let categoryIds;
    if (!foundCategory) {
      try {
        const response = await fetch("http://localhost:3000/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: categoryName }),
        });
        if (response.ok) {
          const newCategory = await response.json();
          categoryIds = [newCategory.id];
        } else {
          setMessage("Failed to create category.");
          return;
        }
      } catch (error) {
        setMessage("Error creating category: " + error.message);
        return;
      }
    } else {
      categoryIds = [foundCategory.id];
    }

    // Check if an event with the same details already exists for the user
    const existingEvent = events.find(
      (existingEvent) =>
        existingEvent.createdBy === createdBy &&
        existingEvent.title === title &&
        existingEvent.description === description &&
        existingEvent.startTime === startTime &&
        existingEvent.endTime === endTime &&
        existingEvent.location === location
    );

    if (existingEvent) {
      setMessage(
        "An event with the same details already exists for this user."
      );
      return;
    }

    // Create event object
    const eventData = {
      createdBy,
      title,
      description,
      image,
      categoryIds: [parseInt(categoryIds)], // Convert to number
      location,
      startTime,
      endTime,
    };

    // Call createEvent function from parent component
    createEvent(eventData);
    setShowForm(false);

    // Clear form fields
    const clearFormFields = () => {
      setUserName("");
      setTitle("");
      setDescription("");
      setImage("");
      setCategoryName("");
      setLocation("");
      setStartTime("");
      setEndTime("");
    };

    clearFormFields();
  };

  const handleCancel = () => {
    setShowForm(false);
    const clearFormFields = () => {
      setUserName("");
      setTitle("");
      setDescription("");
      setImage("");
      setCategoryName("");
      setLocation("");
      setStartTime("");
      setEndTime("");
    };

    clearFormFields();
  };

  return (
    <>
      {showForm ? (
        <Center>
          <Box bg="#1A365D" p="4" color="white" borderRadius="md">
            <>
              {message && <Text>{message}</Text>}{" "}
              <Heading pb={4}>Create New Event</Heading>
              {/* Display message if available */}
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <Input
                    type="text"
                    required
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    required
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    required
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="url"
                    required
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    required
                    placeholder="Category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    required
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="datetime-local"
                    required
                    placeholder="Start Time"
                    value={startTime}
                    min={new Date().toISOString().slice(0, 16)} // Set minimum value to current date and time
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <Input
                    type="datetime-local"
                    required
                    placeholder="End Time"
                    value={endTime}
                    min={startTime} // Set minimum value to the start time
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </FormControl>
                <Button type="submit" colorScheme="teal" mr={3}>
                  Create
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
            Create
          </Text>
        </Center>
      )}
    </>
  );
};
