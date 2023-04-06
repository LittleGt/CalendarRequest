const { getPerson } = require('../utils/file');

exports.createPersonMapping = async () => {
  const persons = await getPerson();
  return persons.reduce((acc, el) => {
    if (!acc[el.id]) {
      acc[el.id] = el;
    }
    return acc;
  }, {});
};
