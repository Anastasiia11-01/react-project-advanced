import React from "react";
import {
  Heading,
  Link as ChakraLink,
  Box,
  Center,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";

export const loader = async ({ params }) => {
  const usersResponse = await fetch("http://localhost:3000/users");
  const eventsResponse = await fetch("http://localhost:3000/events");
  const categoryResponse = await fetch(
    `http://localhost:3000/categories/${params.categoryId}`
  );

  const users = await usersResponse.json();
  const events = await eventsResponse.json();
  const category = await categoryResponse.json();

  return { users, events, category };
};

export const CategoryPage = () => {
  const { events, category } = useLoaderData();

  return (
    <Center h="100vh" maxW="1400px" bg="#CAF0F8" color="#03045E" p="4" borderRadius="md">
      <Box textAlign="center">
        <Heading textTransform="uppercase" pb="35">
          {category.name}
        </Heading>
        <UnorderedList mt="4" textAlign="left" spacing="4">
          {events
            .filter(
              (event) =>
                event.categoryIds && event.categoryIds.includes(category.id)
            ) // Add null check for event.categoryIds
            .map((event) => (
              <ListItem key={event.id}>
                <ChakraLink
                  as={Link}
                  to={`/events/${event.id}`}
                  color="#03048E"
                >
                  {event.title}
                </ChakraLink>{" "}
                - On {event.startTime.slice(0, 10)} at{" "}
                {event.startTime.slice(11, 16)} - {event.endTime.slice(11, 16)}
              </ListItem>
            ))}
        </UnorderedList>
      </Box>
    </Center>
  );
};
