import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

export const DeleteRedirect = ({ onRedirect }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRedirect();
    }, 3000); // Redirect after 5 seconds

    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, [onRedirect]);

  return (
    <Box bg="black" color="white" p={4} borderRadius="md">
      <Text>Event deleted successfully.</Text>
    </Box>
  );
};
