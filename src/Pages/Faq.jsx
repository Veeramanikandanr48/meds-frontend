import React, { useState } from 'react';
import { HiOutlinePlusSm, HiOutlineMinusSm } from 'react-icons/hi';
import Layout from '../Layout';

const FAQ = () => {
    const faqData = [
        {
          id: 1,
          question: "What is erectile dysfunction (ED)?",
          answer: "Erectile dysfunction, or ED, is the inability to achieve or maintain an erection sufficient for sexual intercourse. It can be caused by various factors including physical conditions, psychological issues, or lifestyle choices."
        },
        {
          id: 2,
          question: "What are the common causes of erectile dysfunction?",
          answer: "Common causes of ED include cardiovascular disease, diabetes, high blood pressure, obesity, hormonal imbalances, psychological factors like stress and anxiety, and lifestyle choices such as smoking and excessive alcohol consumption."
        },
        {
          id: 3,
          question: "How do ED medications work?",
          answer: "ED medications, such as Viagra, Cialis, and Levitra, work by increasing blood flow to the penis, which helps men achieve and sustain an erection when sexually aroused. These medications belong to a class of drugs called phosphodiesterase type 5 (PDE5) inhibitors."
        },
        {
          id: 4,
          question: "Are ED medications safe to use?",
          answer: "Generally, ED medications are safe for most men when used as prescribed by a healthcare professional. However, they may not be suitable for everyone, especially those with certain medical conditions or who are taking certain medications. It's essential to consult with a doctor before starting any ED medication."
        },
        {
          id: 5,
          question: "How long do the effects of ED medications last?",
          answer: "The duration of the effects varies depending on the specific medication. For example, Viagra typically lasts for about four to six hours, while Cialis can last up to 36 hours. Levitra falls somewhere in between, with effects lasting around five hours. It's important to follow the prescribed dosage and timing."
        },
        {
          id: 6,
          question: "Can I take ED medications if I have other health conditions or take other medications?",
          answer: "It's crucial to consult with a healthcare professional before taking ED medications, especially if you have underlying health conditions or are taking other medications. Certain health conditions or medications may interact with ED drugs, leading to adverse effects or complications."
        },
        {
          id: 7,
          question: "Are there alternative treatments for erectile dysfunction?",
          answer: "Yes, there are alternative treatments for ED, including lifestyle changes such as maintaining a healthy diet, regular exercise, managing stress, and quitting smoking. Additionally, some men may benefit from therapies like counseling, vacuum erection devices, or penile implants."
        },
        {
          id: 8,
          question: "Are the products on your website FDA-approved?",
          answer: "We prioritize the safety and efficacy of the products we offer. While not all products may be FDA-approved, we ensure they meet high-quality standards and are sourced from reputable manufacturers."
        },
        {
          id: 9,
          question: "Is my personal information secure when making purchases on your website?",
          answer: "Yes, we take the security of your personal information seriously. Our website employs industry-standard encryption protocols to protect your data during transactions. Additionally, we adhere to strict privacy policies to safeguard your information."
        },
        {
          id: 10,
          question: "Do you offer discreet packaging and shipping?",
          answer: "Yes, we understand the importance of privacy when dealing with sensitive health products. We provide discreet packaging and shipping to ensure your confidentiality is maintained throughout the ordering and delivery process."
        },
        {
          id: 11,
          question: "Understanding Men's Sexual Health:",
          answer: "Men's sexual health encompasses various aspects of physical, mental, and emotional well-being related to sexual activity and reproductive function. It's essential for men to prioritize their sexual health to maintain satisfying and fulfilling intimate relationships."
        },
        {
          id: 12,
          question: "Common Sexual Health Issues in Men:",
          answer: "Men may experience a range of sexual health issues, including erectile dysfunction (ED), premature ejaculation, low libido (low sex drive), performance anxiety, and difficulties with orgasm. These issues can have significant impacts on self-esteem, relationships, and overall quality of life."
        }
      ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Layout>
    <div className="container mx-auto my-5 px-4 min-vh-100">
      <h1 className="text-center text-3xl font-semibold mb-8">Frequently Asked Questions</h1>
      <dl className="space-y-4">
        {faqData.map((faq, index) => (
          <React.Fragment key={index}>
            <dt 
              className={`border-b p-3 cursor-pointer ${index === openIndex ? 'text-blue-500' : 'text-gray-900'}`}
              aria-expanded={index === openIndex ? 'true' : 'false'} 
              onClick={() => toggleAccordion(index)}
            >
              <span className="flex justify-between items-center">
                <span>{faq.question}</span>
                {index === openIndex ? <HiOutlineMinusSm className="text-lg" /> : <HiOutlinePlusSm className="text-lg" />}
              </span>
            </dt>
            <dd className={`pl-6 ${index !== openIndex ? 'hidden' : ''}`}>
              {faq.answer}
            </dd>
          </React.Fragment>
        ))}
      </dl>
    </div></Layout>
  );
};

export default FAQ;
