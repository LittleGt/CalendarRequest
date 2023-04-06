const { v4: uuidv4 } = require('uuid');
const { getRequest, saveRequest } = require('../utils/file');

exports.findAll = () => getRequest();

exports.findById = async id => {
  const requests = await getRequest();
  return requests.find(el => el.id === id) ?? null;
};

exports.save = async data => {
  const requests = await getRequest();
  const request = { id: uuidv4(), ...data };
  requests.push(request);
  await saveRequest(requests);
  return request;
};

exports.updateById = async (id, data) => {
  const requests = await getRequest();
  const idx = requests.findIndex(el => el.id === id);
  if (idx !== -1) {
    requests[idx] = { id, ...data };
    await saveRequest(requests);
    return requests[idx];
  }
  return null;
};

exports.deleteById = async id => {
  const requests = await getRequest();
  const idx = requests.findIndex(el => el.id === id);
  if (idx !== -1) {
    requests.splice(idx, 1);
    await saveRequest(requests);
    return true;
  }
  return false;
};
