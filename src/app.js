const express = require('express');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User Routes
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
