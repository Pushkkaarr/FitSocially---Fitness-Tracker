import mongoose from 'mongoose';

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PS}@myprojects.suzev.mongodb.net/FitSocial`;

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
