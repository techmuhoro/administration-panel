const obj = {
  user: {
    name: "James Muhoro",
    work: {
      company: {
        ipay: {
          name: "FiveSpot Limited",
        },
      },
    },
  },
};

function getObjValueByPath(obj, path) {
  const keys = path.split(".");

  let value = obj;

  for (let key of keys) {
    if (value.hasOwnProperty(key)) {
      value = value[key];
    } else {
      return undefined;
    }
  }

  return value;
}

console.log(getObjValueByPath(obj, "user.work.company.ipay.name"));
