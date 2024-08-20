import {
  Button,
  Heading,
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
import React, { useCallback, useContext, useState } from "react";
import socket from "../../../socket";
import TextField from "../../common/TextField";
import { FriendContext } from "../Home";

const FriendModal = ({ isOpen, onClose }) => {
  const [error, setError] = useState("");
  const { friendList, setFriendList } = useContext(FriendContext);

  const closeModal = useCallback(() => {
    setError("");
    onClose();
  }, [onClose]);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ friendname: "" }}
          validationSchema={friendSchema}
          onSubmit={async (values, actions) => {
            socket.emit(
              "add_friend",
              values.friendname,
              ({ errorMsg, done }) => {
                console.log("res", errorMsg, done);
                if (done) {
                  setFriendList([values.friendname, ...friendList]);
                  closeModal();
                  return;
                }
                setError(errorMsg);
              }
            );
            actions.resetForm();
          }}
        >
          <Form>
            <ModalBody>
              <Heading as="p" size="sm" color="red.500">
                {error}
              </Heading>
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
