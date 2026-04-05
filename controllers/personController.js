import Person from "../models/person.js";

export const getInfo = (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      res.send(
        `<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`,
      );
    })
    .catch((error) => next(error));
};

export const getAllPersons = (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((error) => next(error));
};

export const getPerson = (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => (person ? res.json(person) : res.status(404).end()))
    .catch((error) => next(error));
};

export const addPerson = (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number)
    return res.status(400).json({ error: "content missing" });

  const person = new Person({ name, number });
  person
    .save()
    .then((saved) => res.json(saved))
    .catch((error) => next(error));
};

export const deletePerson = (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
};

export const updatePerson = (req, res, next) => {
  const { name, number } = req.body;
  const person = { name, number };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
};
