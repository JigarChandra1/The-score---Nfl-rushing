const json = require('json2csv');

module.exports = {
  toCsv(fields, data) {
    const json2csv = new json.Parser({ fields });
    return json2csv.parse(data);
  }
};
