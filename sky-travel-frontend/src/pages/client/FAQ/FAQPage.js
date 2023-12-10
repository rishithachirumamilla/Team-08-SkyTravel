import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQPage = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqData = [
    {
      question: 'How do I create an account on the platform?',
      answer:
        'To create an account, simply click on the "Sign Up" or "Register" button on the homepage. Fill in the required details such as your name, email, and password, and follow the prompts to complete the registration process.',
    },
    {
      question: 'What information is required to register for an account?',
      answer:
        'We require basic information like your name, email address, and a secure password to set up your account. Additional details might be requested for a more personalized experience.',
    },
    {
      question: 'Is my account information secure?',
      answer:
        'Yes, we prioritize the security of your data. We use encryption and industry-standard security protocols to safeguard your personal information.',
    },
    {
      question: 'How can I recover my password if I forget it?',
      answer:
        'If you forget your password, simply click on the "Forgot Password" link on the login page. We\'ll send you instructions on how to reset your password to the email associated with your account.',
    },
    {
      question: 'How can I search for flights based on my preferred dates and destinations?',
      answer:
        'You can easily search for flights by entering your departure city, destination, and preferred dates on our homepage. Our search engine will display available options for you to choose from.',
    },
    {
      question: 'What details are provided for each flight option during the search?',
      answer:
        'Our search results display essential details such as airline, departure and arrival times, layovers (if any), flight duration, and available classes.',
    },
    {
      question: 'Can I filter search results based on specific airlines or flight classes?',
      answer:
        'Yes, you can use filters to narrow down search results by airline, preferred class (economy, business, first class), or specific airlines.',
    },
    {
      question: 'What is the cancellation policy for booked flights?',
      answer:
        'Our cancellation policy varies depending on the airline and fare type. Generally, refundable tickets allow cancellations with a refund, while non-refundable tickets might incur fees or have restrictions on refunds.',
    },
    {
      question: 'Is there a time frame within which I can cancel my booking without any penalties?',
      answer:
        'The cancellation window without penalties depends on the specific fare rules. Some tickets allow free cancellations within 24 hours of booking, while others might have different time frames.',
    },
    {
      question: 'How can I cancel my booking, and what is the process for requesting a refund?',
      answer:
        'You can cancel your booking through your account on our platform or by contacting our customer support team. Refund requests are usually processed according to the airline\'s policies and may take time to reflect depending on the payment method.',
    },
    {
      question: 'Will I receive a full refund if I cancel my flight?',
      answer:
        'Refunds depend on various factors such as the ticket type, the airline\'s policy, and the time of cancellation. Some tickets may incur fees or deductions, while others might offer a full refund within specific time frames.',
    },
    {
      question: 'Are there any fees associated with cancellations or changes to my booking?',
      answer:
        'Depending on the fare type and timing of the cancellation, fees might apply. Flexible or higher-tier tickets usually offer more lenient cancellation policies, while economy or discounted fares might have stricter terms.',
    },
    {
      question: 'How long does it take to process a refund after canceling my booking?',
      answer:
        'Refunds typically take a few business days to process. However, the timeline might vary based on the airline\'s policies and the payment method used.',
    },
    {
      question: 'Can I modify or change my flight instead of canceling?',
      answer:
        'Depending on the fare rules, some tickets allow modifications with possible change fees. You can check your booking details or contact our customer support for assistance with changes.',
    },
    {
      question: 'What happens if my flight is canceled by the airline?',
      answer:
        'If the airline cancels your flight, you\'re typically entitled to a refund or an alternative flight, as per their policies. We\'ll assist you in arranging an alternative or processing a refund based on the airline\'s guidelines.',
    },
  ];
  
  return (
    <Container sx={{ paddingTop: 4, paddingBottom: 8 }}>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>

      {faqData.map((faq, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          sx={{ marginBottom: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQPage;
