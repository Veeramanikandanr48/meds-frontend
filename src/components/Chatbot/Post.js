import React, { useEffect } from 'react';
import BACKEND_URL from '../../Data/config';
import axios from 'axios';

const Post = ({ steps }) => {
  useEffect(() => {
    const { firstname, lastname, email } = steps;
    const userObject = {
      first_name: firstname.value,
      last_name: lastname.value,
      email: email.value,
    };
    console.log(userObject)

    const postData = async () => {
      try {
        const res = await axios.post(`${BACKEND_URL}chat`, userObject);
        console.log(res.status);
      } catch (error) {
        console.error(error);
      }
    };

    postData();
  }, [steps]);

  return <div>Thank you! Your data was submitted successfully!</div>;
};

export default Post;
