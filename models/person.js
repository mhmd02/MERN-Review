let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
];

export const findAll = () => {
  return persons;
};

export const findById = (id) => persons.find(p => p.id === id);

export const remove = (id) => {
  persons = persons.filter(p => p.id !== id);
  return true; 
};

export const create = (person) => {
  const newPerson = {
    id: String(Math.floor(Math.random() * 1000000)),
    ...person
  };
  persons = persons.concat(newPerson);
  return newPerson;
};