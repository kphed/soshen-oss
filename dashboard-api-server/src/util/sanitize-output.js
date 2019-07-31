const { cloneDeep } = require('lodash');

const sanitizeObject = (obj, customFields = [], plain = true) => {
  if (!obj) {
    return null;
  }

  const newObj = cloneDeep((plain ? obj.get({ plain: true }) : obj));

  delete newObj.createdAt;
  delete newObj.updatedAt;

  customFields.forEach((field) => {
    delete newObj[field];
  });

  return newObj;
};

const sanitizeList = (list, customFields = []) => {
  if (!list) {
    return null;
  }

  const newList = [];

  list.forEach((obj => newList.push(sanitizeObject(obj, customFields, false))));

  return newList;
};

module.exports = {
  sanitizeObject,
  sanitizeList,
};
