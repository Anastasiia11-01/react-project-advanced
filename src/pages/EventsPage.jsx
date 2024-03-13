import React, { useState } from "react";
import {
  Heading,
  Center,
  Flex,
  Select,
  VStack,
  Spinner,
} from "@chakra-ui/react";

import { EventCard } from "../components/EventCard";
import { TextInput } from "../ui/TextInput";

import { useEventData } from "../useEventData";

export const EventsPage = ({ clickFn }) => {
  const { users, events, categories } = useEventData();
  const [searchField, setSearchField] = useState("");

  const matchedEvents = events.filter((event) => {
    return event.title.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleChange = (e) => setSearchField(e.target.value);

  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter events based on selected category
  const filteredOnCategories = events.filter((event) => {
    if (selectedCategory === "all") {
      return true; // Include all events when "all" is selected
    } else {
      // Check if event.categoryIds exists and is an array before calling .includes()
      return (
        event.categoryIds &&
        Array.isArray(event.categoryIds) &&
        event.categoryIds.includes(parseInt(selectedCategory))
      );
    }
  });

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Check if data is still being fetched
  if (!users.length || !events.length || !categories.length) {
    return (
      <Center>
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

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
              eventId={event.id}
              categoryId={
                event.categoryIds && event.categoryIds.length > 0
                  ? event.categoryIds[0]
                  : ""
              }
            />
          ))}
        </Flex>
      </Center>
    </div>
  );
};
