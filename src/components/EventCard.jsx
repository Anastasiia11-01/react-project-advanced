import React from "react";
import { Card, Image, CardBody, Stack, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EventCard = ({ event, clickFn, users, categories }) => {
  try {
    return (
      <Card
        borderRadius="xl"
        w="sm"
        h="auto"
        onClick={() => clickFn(event)}
        cursor="pointer"
        _hover={{ transform: "scale(1.01)" }}
      >
        <CardBody>
          <Link to={`events/${event.id}`}>
            <Image
              h={64}
              w="sm"
              src={event.image}
              borderRadius="xl"
              alt="Sorry, no picture available :("
            />
          </Link>

          <Stack mt="6" spacing="3">
            <Heading color="#03045E" size="md">
              <Link to={`events/${event.id}`}>
                <h2>{event && event.title}</h2>
              </Link>
            </Heading>
            <Text color="#00B4D8">
              by{" "}
              {users && users.find((user) => user.id === event.createdBy)?.name}
            </Text>
            <Text color="#718096" textTransform="uppercase">
              {event.description}
            </Text>
            <Text color="#718096">
              Date: {new Date(event.startTime).getDate()}{" "}
              {new Date(event.startTime).toLocaleString("en-US", {
                month: "short",
              })}{" "}
              {new Date(event.startTime).getFullYear()}
            </Text>
            <Text color="#718096">
              Time: {event.startTime.slice(11, 16)} -{" "}
              {event.endTime.slice(11, 16)}
            </Text>
            <Text color="#718096" textTransform="uppercase">
              Category:{" "}
              {event.categoryIds &&
                Array.isArray(event.categoryIds) &&
                event.categoryIds.length > 0 &&
                categories.length > 0 &&
                event.categoryIds.map((categoryId) => {
                  const category = categories.find(
                    (cat) => cat.id === categoryId
                  );
                  return category ? (
                    <Link key={categoryId} to={`/categories/${categoryId}`}>
                      {category.name}
                    </Link>
                  ) : null;
                })}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    );
  } catch (error) {
    console.error("Error in EventCard:", error);
    // Render a fallback UI or return null
    return null;
  }
};
