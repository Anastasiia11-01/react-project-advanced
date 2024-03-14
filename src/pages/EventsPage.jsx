import React, { useState } from "react";
import { Heading, Center, Flex, Select } from "@chakra-ui/react";

import { EventCard } from "../components/EventCard";
import { TextInput } from "../ui/TextInput";

import { useEventData } from "../useEventData";

export const EventsPage = ({ clickFn }) => {
  const { users, events, categories } = useEventData();
  const [searchField, setSearchField] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchChange = (e) => setSearchField(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const filteredEvents = events.filter((event) => {
    const titleMatch = event.title
      .toLowerCase()
      .includes(searchField.toLowerCase());
    const categoryMatch =
      selectedCategory === "" ||
      event.categoryIds.includes(parseInt(selectedCategory));
    console.log("Title Match:", titleMatch);
    console.log("Category Match:", categoryMatch);
    console.log(event.categoryIds, selectedCategory);
    return titleMatch && categoryMatch;
  });

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
          changeFn={handleSearchChange}
          w="45%"
          mb={4}
          bgColor="white"
          placeholder="Search for events"
        />
      </Center>
      <Center>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          w="15%"
          mb={4}
          bgColor="#03045E"
          color="grey"
          focusBorderColor="#FAF089"
          placeholder="All Categories"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </Center>
      <Center>
        <Flex gap={3} w="100%" maxW="1200px" flexWrap="wrap" justify="center">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              clickFn={clickFn}
              event={event}
              users={users}
              categories={categories}
              eventId={event.id}
              categoryId={
                event.categoryIds && event.categoryIds.length > 0
                  ? event.categoryIds
                  : ""
              }
            />
          ))}
        </Flex>
      </Center>
    </div>
  );
};
