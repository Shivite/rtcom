import { Button, ButtonGroup, Heading, VStack } from "@chakra-ui/react";
import { formSchema } from "@rtcom-app/common";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import TextField from "./TextField";
export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={formSchema}
      onSubmit={async (values, actions) => {
        try {
          const response = await fetch("http://localhost:4000/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          console.log("Success:", data);
          if (!data) return;
          setUser({ ...data });
          navigate("/home");
        } catch (error) {
          console.error("Error:", error);
        } finally {
          // Reset the form
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
