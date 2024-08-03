import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "../components/Footer";

const ContactFormWithInfo = () => {
  const initialValues = {
    Name: "",
    email: "",
    phone: "",
    country: "USA",
    message: "",
  };

  const emailContent = {
    recipient: "info@medsforhim.com",
    subject: "Message from Contact Form",
    body: "Dear recipient,\n\nI am writing to you regarding...",
  };

  const validationSchema = Yup.object().shape({
    Name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    message: Yup.string().required("Message is required"),
  });

  const onSubmit = (values, { resetForm, setFieldValue }) => { // Add setFieldValue here
    const { Name, email, phone, country, message } = values;

    // Check if all required fields are filled
    if (Name && email && phone && message) {
      // Construct the email content
      const { recipient, subject } = emailContent;
      const body = `Name: ${Name}\nEmail: ${email}\nPhone: ${phone}\nCountry: ${country}\n\n${message}`;

      // Construct the mailto link
      const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      // Open default email client with pre-filled content
      window.location.href = mailtoLink;

      // Reset the form after submission
      resetForm();
    }
  };

  return (
    <>
      <div className="container mx-auto py-10 px-5">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Contact Us</h2>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-400 to-green-600 text-white shadow-md rounded-lg p-10">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ errors, touched, values, setFieldValue }) => ( // Pass values and setFieldValue here
                  <Form>
                    <div className="mb-4">
                      <FieldWrapper label="Name" name="Name" error={errors.Name} touched={touched.Name}>
                        <Field
                          type="text"
                          name="Name"
                          id="Name"
                          className="form-control"
                          placeholder="Enter your name"
                        />
                      </FieldWrapper>
                    </div>
                    <div className="mb-4">
                      <FieldWrapper label="Email Address" name="email" error={errors.email} touched={touched.email}>
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          placeholder="Enter your email address"
                        />
                      </FieldWrapper>
                    </div>
                    <div className="mb-4">
                      <FieldWrapper label="Phone" name="phone" error={errors.phone} touched={touched.phone}>
                        {/* Use the PhoneInput component here */}
                        <PhoneInput
                          country={"us"}
                          value={values.phone}
                          onChange={(phone) => setFieldValue('phone', phone)}
                          inputClass="form-control py-3 w-100"
                        />
                        {/* Display error message if any */}
                        {errors.phone && touched.phone && <div className="text-danger">{errors.phone}</div>}
                      </FieldWrapper>
                    </div>
                    <div className="mb-4">
                      <FieldWrapper label="Country" name="country">
                        <Field
                          as="select"
                          name="country"
                          id="country"
                          className="form-control"
                        >
                          <option value="USA">USA</option>
                          <option value="Non USA">Non USA</option>
                        </Field>
                      </FieldWrapper>
                    </div>
                    <div className="mb-4">
                      <FieldWrapper label="Message" name="message" error={errors.message} touched={touched.message}>
                        <Field
                          as="textarea"
                          name="message"
                          id="message"
                          rows="4"
                          className="form-control"
                          placeholder="Enter your message"
                        />
                      </FieldWrapper>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="bg-white text-green-600 py-2 px-4 rounded-lg shadow-md hover:bg-green-500 hover:text-black transition duration-300 ease-in-out"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <aside className="lg:col-span-1">
            <div className="p-6 lg:p-10 mt-10 lg:mt-0">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="flex items-center mb-4">
                <FaPhone className="text-gray-600 mr-2" />
                <span className="text-gray-600">+1234567890</span>
              </div>
              <div className="flex items-center mb-4">
                <FaEnvelope className="text-gray-600 mr-2" />
                <span className="text-gray-600">info@medsforhim.com</span>
              </div>
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-gray-600 mr-2" />
                <span className="text-gray-600">10300 49th St N STE 427, Clearwater, FL, 33762</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
};

const FieldWrapper = ({ label, name, error, touched, children }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      {children}
      {error && touched && (
        <div className="text-danger">{error}</div>
      )}
    </div>
  );
};

export default ContactFormWithInfo;
