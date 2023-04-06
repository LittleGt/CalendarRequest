const { getPerson, getTopic } = require('../utils/file');

exports.createPersonMapping = async () => {
  const persons = await getPerson();
  return persons.reduce((acc, el) => {
    if (!acc[el.id]) {
      acc[el.id] = el;
    }
    return acc;
  }, {});
};


exports.createTopicMapping = async () => {
  const topics = await getTopic();
  return topics.reduce((acc, el) => {
    if (!acc[el.id]) {
      acc[el.id] = el;
    }
    return acc;
  }, {});
};
