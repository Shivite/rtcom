import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
export default function Login() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("The user name is required field!")
        .min(6, "Username is too short")
        .max(28, "Username can not be too long!"),

      password: Yup.string()
        .required("The password is required field!")
        .min(6, "Password is too short")
        .max(28, "Password can not be too long!"),
    }),
    onSubmit: (values, actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });
  return (
    <VStack
      as="form"
      w={{ base: "90%", md: "500px" }}
      m="auto"
      justify="center"
      height="100vh"
      spacing="1rem"
      onSubmit={formik.handleSubmit}
    >
      <Heading>Login Page</Heading>
      <FormControl
        isInvalid={formik.errors.username && formik.touched.username}
      >
        <FormLabel fontSize="lg">User Name</FormLabel>
        <Input
          name="username"
          placeholder="Enter user name"
          autoComplete="off"
          size="lg"
          //   value={formik.values.username}
          //   onChange={formik.handleChange}
          //   onBlur={formik.handleBlur}
          {...formik.getFieldProps("username")}
        ></Input>
        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={formik.errors.password && formik.touched.password}
      >
        <FormLabel fontSize="lg">Password</FormLabel>
        <Input
          name="password"
          type="password"
          placeholder="Enter Password"
          autoComplete="off"
          size="lg"
          {...formik.getFieldProps("password")}
        ></Input>
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>
      <ButtonGroup pt="1rem">
        <Button colorScheme="teal" type="submit">
          Login
        </Button>
        <Button>Create Account</Button>
      </ButtonGroup>
    </VStack>
  );
}
