import { Button, ButtonGroup, Heading, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import TextField from "./TextField";
export default function Register() {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required("The user name is required field!")
          .min(6, "Username is too short")
          .max(28, "Username can not be too long!"),

        password: Yup.string()
          .required("The password is required field!")
          .min(6, "Password is too short")
          .max(28, "Password can not be too long!"),
      })}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values, null, 2));
        actions.resetForm();
      }}
    >
      <VStack
        as={Form}
        w={{ base: "90%", md: "500px" }}
        m="auto"
        justify="center"
        height="100vh"
        spacing="1rem"
      >
        <Heading>Register Page</Heading>
        <TextField
          name="username"
          placeholder="enterusername"
          label="User Name"
          autoComplete="off"
        />
        <TextField
          name="password"
          placeholder="Enter password"
          label="Password"
          autoComplete="off"
        />
        <ButtonGroup pt="1rem">
          <Button colorScheme="teal" type="submit">
            Create Account
          </Button>
          <Button onClick={() => navigate("/")}>Login In</Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
}
