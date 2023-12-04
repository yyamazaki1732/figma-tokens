const jsonData = JSON.parse(fs.readFileSync("./data/variables2.json", "utf8"));

function replaceTokenValues(data) {
  const primitiveMapping = {};
  data.collections.forEach((collection) => {
    if (collection.name === "Primitive") {
      collection.modes[0].variables.forEach((variable) => {
        primitiveMapping[variable.name] = variable.value;
      });
    }
  });

  const assets = new Object();
  data.collections.forEach((collection) => {
    if (collection.name === "Tokens") {
      collection.modes[0].variables.forEach((variable) => {
        const keyParts = variable.name.split("/");
        const type = keyParts[0]; // "surface" や　"text"
        const key = keyParts[1]; // "primary"　や "secondary"
        if (!assets[type]) {
          assets[type] = {};
        }
        assets[type][key] = primitiveMapping[variable.value.name];
      });
    }
  });
  return assets;
}

const variablesData = replaceTokenValues(jsonData);
export default variablesData;
