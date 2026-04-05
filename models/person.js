import mongoose from 'mongoose';

const url = process.env.URI;

mongoose.connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch(err => console.log('error connecting to MongoDB:', err.message));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
const Person = mongoose.model('Person', personSchema);

export default Person;