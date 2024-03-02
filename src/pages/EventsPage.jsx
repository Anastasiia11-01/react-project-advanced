import React, { useState } from "react";
import { Heading, Center, Flex } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { EventCard } from "../components/EventCard";
import { TextInput } from "../ui/TextInput";

export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = ({ clickFn }) => {
  const { users, events, categories } = useLoaderData();
  const [searchField, setSearchField] = useState("");

  const matchedEvents = events.filter((event) => {
    return event.title.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleChange = (e) => setSearchField(e.target.value);

  return (
    <div
      style={{
        backgroundColor: "#CAF0F8",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Center>
        <Heading color="#03045E" mb="4">
          List of events
        </Heading>
      </Center>
      <Center>
        <TextInput
          changeFn={handleChange}
          w="45%"
          mb={8}
          bgColor="white"
          placeholder="Search for events:"
        />
      </Center>
      <Center>
        <Flex gap={3} w="100%" maxW="1200px" flexWrap="wrap" justify="center">
          {matchedEvents.map((event) => (
            <EventCard
              key={event.id}
              clickFn={clickFn}
              event={event}
              users={users}
              categories={categories}
            />
          ))}
        </Flex>
      </Center>
    </div>
  );
};
