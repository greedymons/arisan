let library = {
  requiredValidation: async (req, items) => {
    for (let item of items) {
      if (req[item] == undefined) {
        throw new Error(item + " is required");
      }
    }
    return true;
  }
}

module.exports = library;