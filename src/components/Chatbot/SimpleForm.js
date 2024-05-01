import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import Post from './Post';

const SimpleForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleEnd = () => {
    // Logic to handle the end of the chat
  };

  return (
    <ChatBot 
      steps={[
        {
          id:'q-firstname', 
          message:'What is your first name?', 
          trigger:'firstname',
        },
        {
          id:'firstname', 
          user:true,
          trigger:'q-lastname',
          validator: (value) => {
            setFirstName(value);
            return true;
          }
        },
        {
          id:'q-lastname', 
          message: ({ previousValue }) => `What is your last name?`,
          trigger:'lastname',
          end: firstName.trim() !== '' // End the conversation if the user has already provided their first name
        },
        {
          id:'lastname', 
          user:true,
          trigger:'q-email',
          validator: (value) => {
            setLastName(value);
            return true;
          }
        },
        {
          id:'q-email', 
          message: ({ previousValue }) => `what is your email?`, 
          trigger:'email',
          end: lastName.trim() !== '' // End the conversation if the user has already provided their last name
        },
        {
          id:'email', 
          user:true,
          trigger:'q-submit',
          validator: (value) => {
            setEmail(value);
            return true;
          }
        },
        {
          id:'q-submit', 
          message:'Do you wish to submit?', 
          trigger:'submit'
        },
        {
          id:'submit', 
          options:[
            {value:'y', label:'Yes', trigger:'end-message'},
            {value:'n', label:'No', trigger:'no-submit'},
          ] 
        },
        {
          id: 'no-submit',
          message:'Your information was not submitted.', 
          end: true,
        },
        {
          id: 'end-message',
          component: <Post firstName={firstName} lastName={lastName} email={email} />,
          asMessage: true,
          end: true,
        },
      ]}
      handleEnd={handleEnd}
    />
  );
};

export default SimpleForm;
