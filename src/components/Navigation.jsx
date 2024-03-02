import React from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Heading, Spacer, Button, Center } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Flex bg="#03045E" p="4" alignItems="center">
      <Box p="2">
        <Center>
          <Heading size="md" color="#CAF0F8">
            Entertainment website
          </Heading>
        </Center>
      </Box>
      <Spacer />
      <Box>
        <Button colorScheme="whiteAlpha" mr="4">
          <Link to="/">Home</Link>
        </Button>
        <Button colorScheme="whiteAlpha">
          <Link to="/events/1">Event</Link>
        </Button>
      </Box>
    </Flex>
  );
};
