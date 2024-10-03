import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/FitSocial';

export async function connectDB() {
  mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error(err);
  });

}

export default connectDB;
