const queryFieldGenerator = (obj, keys) => {
  const finalObject = {};

  for (const key of keys) {
    if (obj && obj.hasOwnProperty.call(obj, key)) {
      finalObject[key] = obj[key];
    }
  }
  return finalObject;
};

export default queryFieldGenerator;
