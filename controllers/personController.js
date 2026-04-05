import findAll from '../models/person.js';

export const getAllPersons = (req, res) => {
  const persons = findAll();
  res.json(persons);
};
