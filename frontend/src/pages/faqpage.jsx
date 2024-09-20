import React from 'react';

function faqpage() {
  // Define FAQ data
  const faqs = [
    { question: "What are the benefits of regular exercise?", answer: "Regular exercise can improve cardiovascular health, boost mood, increase energy levels, and help manage weight." },
    { question: "How often should I work out?", answer: "It's recommended to aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity activity each week, along with muscle-strengthening exercises on two or more days per week." },
    { question: "What should I eat before and after a workout?", answer: "Before a workout, it's good to consume a balanced meal or snack containing carbohydrates and protein to fuel your exercise. Afterward, focus on replenishing fluids and electrolytes with water and consuming protein and carbohydrates to aid in muscle recovery." },
    { question: "How can I prevent injuries during exercise?", answer: "To prevent injuries, it's essential to warm up before exercising, use proper form and technique, gradually increase the intensity of your workouts, listen to your body, and incorporate rest days into your routine." },
    { question: "Is it okay to exercise if I'm sore?", answer: "It's generally safe to exercise when experiencing mild soreness, but it's essential to listen to your body and avoid overexertion. Consider focusing on different muscle groups or engaging in low-impact activities." },
  ];

  return (
    <div className='contact-us'>
      <h1>Frequently Asked Questions</h1>
      <ul>
        {faqs.map((faq, index) => (
          <li key={index}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default faqpage;
