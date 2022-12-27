const findData = (data, value, key, func) => {
  if (func) {
    // const result = data.find((i) => func(i[key]) === func(value));
    return data.find((i) => func(i[key]) === func(value));
  }
  return data.find((i) => i[key] === value);
};

module.exports = {
  findData,
};
