import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import { formSchema } from "@rtcom-app/common";
import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import TextField from "../common/TextField";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={formSchema}
      onSubmit={async (values, actions) => {
        try {
          const response = await fetch("http://localhost:4000/auth/login", {
            method: "POST",
            credentials: "include", // Must have this to store cookies
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          if (data && !data.loggedIn) {
            setError(data.status);
          } else {
            setUser({ ...data });
            navigate("/home");
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          actions.resetForm();
        }
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
        <Heading>Login Page</Heading>
        <Text as="p" color="red.500">
          {error}
        </Text>
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
            Login
          </Button>
          <Button onClick={() => navigate("/register")}>Create Account</Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
}
