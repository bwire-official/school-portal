const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/dbConfig.js');

// Load environment variables from .env file
const result = dotenv.config({ path: './backend/.env' });

if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('Loaded .env file:', result.parsed);
}

console.log('MONGO_URI:', process.env.MONGO_URI);

connectDB();

const app = express();

app.use(express.json());

//// Import routes
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const studentRoutes = require('./src/routes/studentRoutes');
const teacherRoutes = require('./src/routes/teacherRoutes');
const accountantRoutes = require('./src/routes/accountantRoutes');
const testRoute = require('./src/routes/testRoute'); // Import the test route

//// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/accountant', accountantRoutes);
app.use('/api', testRoute); // Use the test route

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
