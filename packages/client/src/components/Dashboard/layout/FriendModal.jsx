import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { friendSchema } from "@rtcom-app/common";
import { Form, Formik } from "formik";
import React from "react";
import TextField from "../../common/TextField";

const FriendModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ friendname: "" }}
          validationSchema={friendSchema}
          onSubmit={async (values, actions) => {
            onClose();
            alert(JSON.stringify(values, null, 2));
            actions.resetForm();
          }}
        >
          <Form>
            <ModalBody>
              <TextField
                name="friendname"
                placeholder="Enter the friend name!"
                label="Friend Name"
                autoComplete="off"
              />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="teal">
                Submit
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default FriendModal;
