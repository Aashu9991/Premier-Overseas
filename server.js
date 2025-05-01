// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

// Initialize express app
const app = express();
const PORT = 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (your HTML, CSS, JS)

// Home route (optional)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // Change path if needed
});

// Contact form POST route
app.post('/contact', (req, res) => {
  const { fullname, company, phone, email, message } = req.body;

  // Create content to save into file
  const content = `
Date: ${new Date().toLocaleString()}
Full Name: ${fullname}
Company: ${company}
Phone: ${phone}
Email: ${email}
Message: ${message}
-----------------------------------------------
`;

  // Save the content into contact-data.txt
  fs.appendFile('contact-data.txt', content, (err) => {
    if (err) {
      console.error('Error saving to file:', err);
      res.status(500).send('Something went wrong. Please try again.');
    } else {
      console.log('Data saved to contact-data.txt');
      res.send('Thank you! Your message has been saved successfully.');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
