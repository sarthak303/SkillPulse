import React from "react";

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <p>If you have any questions or feedback, feel free to reach out to us:</p>
      <ul>
        <li>Email: example@example.com</li>
        <li>Phone: +1234567890</li>
        <li>Address: 123 Example St, City, Country</li>
      </ul>
      <p>You can also fill out the form below:</p>
      <form>
        <label>Name:</label>
        <input type="text" placeholder="Your Name" />
        <label>Email:</label>
        <input type="email" placeholder="Your Email" />
        <label>Message:</label>
        <textarea rows="4" placeholder="Your Message"></textarea><br></br>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
