import React from "react";
import { Input } from "@chakra-ui/react";

export const TextInput = ({ changeFn, ...props }) => (
  <Input
    mt="1rem"
    focusBorderColor="#FAF089"
    color="gray.800"
    onChange={changeFn}
    {...props}
  ></Input>
);
