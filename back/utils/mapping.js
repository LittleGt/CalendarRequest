const { getCategory } = require('../utils/file');

exports.createCategoryMapping = async () => {
  const categories = await getCategory();
  return categories.reduce((acc, el) => {
    if (!acc[el.id]) {
      acc[el.id] = el;
    }
    return acc;
  }, {});
};
