const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Contact = require("./models/contact"); // Import the Contact model
const path = require('path');

app.use(express.static('./public'));

// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://taniya1agarwal:sggy7vLbe78XaZTc@cluster0.d5fccev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Express middleware to parse JSON bodies
app.use(express.json());



// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

/// Handle form submission
app.post('/contact', async (req, res) => {
    try {
        const newContact = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        console.log(req.body)

        // Save the new contact to the database
        await newContact.save();

        // Send a success response back to the client
        res.status(201).json({ message: 'Contact form submitted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to submit contact form. Please try again later.' });
    }
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//sggy7vLbe78XaZTc