const { v4: uuidv4 } = require('uuid');
const { getTopic, saveTopic } = require('../utils/file');

exports.findAll = () => getTopic();

exports.findById = async id => {
  const Topics = await getTopic();
  return Topics.find(el => el.id === id) ?? null;
};

exports.save = async data => {
  const Topics = await getTopic();
  const Topic = { id: uuidv4(), ...data };
  Topics.push(Topic);
  await saveTopic(Topics);
  return Topic;
};

exports.updateById = async (id, data) => {
  const Topics = await getTopic();
  const idx = Topics.findIndex(el => el.id === id);
  if (idx !== -1) {
    Topics[idx] = { id, ...data };
    await saveTopic(Topics);
    return Topics[idx];
  }
  return null;
};

exports.deleteById = async id => {
  const Topics = await getTopic();
  const idx = Topics.findIndex(el => el.id === id);
  if (idx !== -1) {
    Topics.splice(idx, 1);
    await saveTopic(Topics);
    return true;
  }
  return false;
};
