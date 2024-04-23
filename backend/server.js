const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const userRoutes = require('./server/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);

const mongoURI = 'mongodb+srv://sunrichorg21:kC4bPr5ZEIlOYik9@sunrichdb.so4vg1i.mongodb.net/?retryWrites=true&w=majority&appName=SunRichDB';

mongoose.connect(mongoURI, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => {
   console.log('MongoDB connected');
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
