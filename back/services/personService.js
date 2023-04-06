const { v4: uuidv4 } = require('uuid');
const { getPerson, savePerson } = require('../utils/file');

exports.findAll = () => getPerson();

exports.findById = async id => {
  const persons = await getPerson();
  return persons.find(el => el.id === id) ?? null;
};

exports.save = async data => {
  const persons = await getPerson();
  const person = { id: uuidv4(), ...data };
  persons.push(person);
  await savePerson(persons);
  return person;
};
