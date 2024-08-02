import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import Post from "./Post";

const CustomHeader = ({ closeChatbot }) => (
  <div className="flex justify-between items-center p-2 bg-blue-500 text-white">
    <div className="font-bold">Chat</div>
    <button
      onClick={closeChatbot}
      className="bg-red-500 hover:bg-red-500 text-white font-bold py-1 px-2 rounded-full"
    >
      -
    </button>
  </div>
);

const SimpleForm = ({ closeChatbot }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleEnd = () => {
    // Logic to handle the end of the chat
  };

  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
      <ChatBot
        steps={[
          {
            id: "q-firstname",
            message: "What is your first name?",
            trigger: "firstname",
          },
          {
            id: "firstname",
            user: true,
            trigger: "q-lastname",
          },
          {
            id: "q-lastname",
            message: ({ previousValue }) => {
              setFirstName(previousValue);
              return "What is your last name?";
            },
            trigger: "lastname",
          },
          {
            id: "lastname",
            user: true,
            trigger: "q-email",
          },
          {
            id: "q-email",
            message: ({ previousValue }) => {
              setLastName(previousValue);
              return "What is your email?";
            },
            trigger: "email",
          },
          {
            id: "email",
            user: true,
            trigger: "q-submit",
          },
          {
            id: "q-submit",
            message: ({ previousValue }) => {
              setEmail(previousValue);
              return "Do you wish to submit?";
            },
            trigger: "submit",
          },
          {
            id: "submit",
            options: [
              { value: "y", label: "Yes", trigger: "end-message" },
              { value: "n", label: "No", trigger: "no-submit" },
            ],
          },
          {
            id: "no-submit",
            message: "Your information was not submitted.",
            end: true,
          },
          {
            id: "end-message",
            component: (
              <Post firstName={firstName} lastName={lastName} email={email} />
            ),
            asMessage: true,
            end: true,
          },
        ]}
        handleEnd={handleEnd}
        headerComponent={<CustomHeader closeChatbot={closeChatbot} />}
      />
    </div>
  );
};

export default SimpleForm;
