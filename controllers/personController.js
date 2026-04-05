import {findAll, findById, remove, create} from '../models/person.js';

export const getInfo = (req, res) => {
  const count = findAll().length;
  const date = new Date();
  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `);
};

export const getAllPersons = (req, res) => {
  res.json(findAll());
};

export const getPerson = (req, res) => {
  const person = findById(req.params.id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
};

export const deletePerson = (req, res) => {
  remove(req.params.id);
  res.status(204).end(); 
};

export const addPerson = (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' });
  }

  const nameExists = findAll().some(p => p.name === body.name);
  if (nameExists) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  const savedPerson = create({ 
    name: body.name, 
    number: body.number 
  });
  
  res.json(savedPerson);
};
