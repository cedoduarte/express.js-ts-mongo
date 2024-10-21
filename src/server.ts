import mongoose from 'mongoose';
import app from './app';
import { environment } from './config/environment';

mongoose.connect(environment.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });