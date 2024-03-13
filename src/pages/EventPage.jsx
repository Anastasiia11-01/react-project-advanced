import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Center,
  Image,
  Card,
  CardBody,
  Heading,
  Text,
  Flex,
  Button,
  Grid,
  GridItem,
  Box,
  Spinner,
} from "@chakra-ui/react";

import { EventForm } from "../components/EventForm";
import { DeleteEvent } from "../components/DeleteEvent";
import { EditEvent } from "../components/EditEvent";

import { useEventData, useEvent } from "../useEventData";

export const EventPage = () => {
  const { eventId } = useParams(); // Extract eventId from URL params
  const { events, users, categories, isLoading } = useEventData();
  const [initialEvents, setEvents] = useState([]);
  const event = useEvent(eventId);

  useEffect(() => {
    setEvents(event); // Update initialEvents with the fetched event
  }, [event]);

  // Check if the page is still loading
  if (isLoading) {
    return (
      <Center>
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  const handleDeleteEvent = (id) => {
    // Filter out the event to be deleted
    const updatedEvents = initialEvents.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    console.log(`Deleting event with ID ${id}`);
  };

  const [message, setMessage] = useState("");

  const createEvent = (eventData) => {
    fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("New event created successfully!");
        } else {
          throw new Error("Failed to create event");
        }
      })

      .catch((error) => {
        setMessage("Error creating event: " + error.message);
      });
  };

  if (!users.length || !events.length || !categories.length) {
    return (
      <Center>
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <Center bg="#00B4D8" maxW="1400px" flexDirection="column" h="100vh">
      <Center>
        <Heading pb="4" color="#03045E" textTransform="uppercase">
          {event.title}
        </Heading>
      </Center>

      <Card
        borderRadius="xl"
        w={{ base: "90%", md: "3xl" }}
        maxW="1400px"
        h="auto"
        mt="8"
      >
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={4}>
          <GridItem>
            <Image src={event.image} h="100%" borderRadius="xl" />
          </GridItem>

          <GridItem>
            <CardBody>
              <Flex justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Text textTransform="uppercase" fontWeight="bold">
                    {event.description}
                  </Text>
                  <Text textTransform="uppercase" color="#164863">
                    Category:{" "}
                    {event.categoryIds.map((categoryId) => (
                      <Link key={categoryId} to={`/categories/${categoryId}`}>
                        {
                          categories.find(
                            (category) => category.id === categoryId
                          )?.name
                        }
                      </Link>
                    ))}
                  </Text>
                  <Text color="#90E0EF">
                    by {users.find((user) => user.id === event.createdBy)?.name}
                  </Text>
                </Box>
                <Box border="1px solid #E16262">
                  <Text textAlign="right">
                    Date: {new Date(event.startTime).getDate()}{" "}
                    {new Date(event.startTime).toLocaleString("en-US", {
                      month: "short",
                    })}{" "}
                    {new Date(event.startTime).getFullYear()}
                  </Text>
                  <Text textAlign="right">
                    Time: {event.startTime.slice(11, 16)} -{" "}
                    {event.endTime.slice(11, 16)}
                  </Text>
                  {message && <Text>{message}</Text>}
                </Box>
              </Flex>
            </CardBody>
          </GridItem>
        </Grid>
      </Card>
      <Flex justify="center" mt="4">
        <Button bgColor="#E16262" mr="4">
          <DeleteEvent eventId={event.id} onDelete={handleDeleteEvent} />
        </Button>
        <Button bgColor="#FABC60" mr="6">
          <EditEvent event={event} />
        </Button>
        <Button bgColor="#3A9679">
          <EventForm
            users={users}
            categories={categories}
            events={events}
            createEvent={createEvent}
          />
        </Button>
      </Flex>
    </Center>
  );
};
