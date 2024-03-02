import React, { useState } from "react";
import {
  Heading,
  Center,
  Flex,
  Box,
  Text,
  Select,
  VStack,
  Stack,
  Button,
} from "@chakra-ui/react";
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

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredOnCategories = events.filter((event) => {
    return (
      selectedCategory === "all" || event.categoryIds.includes(selectedCategory)
    );
  });

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div
      style={{
        backgroundColor: "#CAF0F8",
        minHeight: "100vh",
        padding: "20px",

        maxWidth: "1400px", // Set maximum width for responsiveness
        margin: "0 auto", // Center content horizontally
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
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          placeholder="Select a category"
          maxWidth="200px"
          pb={4}
        >
          <option value="all">Filter by Category:</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </Center>

      <Center>
        <VStack spacing={4} align="stretch">
          {filteredOnCategories.map((event) => (
            <EventCard key={event.id} event={event} clickFn={clickFn} />
          ))}
        </VStack>
      </Center>
      <Center>
        <Flex gap={3} w="100%" flexWrap="wrap" justify="center">
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
