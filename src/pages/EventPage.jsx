import React, { useState } from "react";
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
} from "@chakra-ui/react";

import { useLoaderData, Link } from "react-router-dom";
import { EventForm } from "../components/EventForm";
import { DeleteEvent } from "../components/DeleteEvent";
import { EditEvent } from "../components/EditEvent";

export const loader = async ({ params }) => {
  const users = await fetch("http://localhost:3000/users");
  const events = await fetch(`http://localhost:3000/events`);
  const event = await fetch(`http://localhost:3000/events/${params.id}`);
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    event: await event.json(),
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { event, events, users, categories } = useLoaderData();
  const [initialEvents, setEvents] = useState(events);

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
          setMessage("Event created successfully!");
        } else {
          throw new Error("Failed to create event");
        }
      })
      .catch((error) => {
        setMessage("Error creating event: " + error.message);
      });
  };

  return (
    <Center bg="#00B4D8" maxW="1200px" flexDirection="column" h="100vh">
      <Center>
        <Heading pb="4" color="#03045E" textTransform="uppercase">
          {event.title}
        </Heading>
      </Center>

      <Card
        borderRadius="xl"
        w={{ base: "90%", md: "3xl" }}
        maxW="1200px"
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
