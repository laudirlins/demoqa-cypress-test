const pick = (values) => values[Math.floor(Math.random() * values.length)];

const randomInteger = (minimum, maximum) =>
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

const uniqueId = () => `${Date.now()}-${randomInteger(1000, 9999)}`;

const uniqueEmail = (prefix = "qa") => `${prefix}.${uniqueId()}@example.com`;

const uniquePassword = () => `Aa1!${randomInteger(100000, 999999)}`;

module.exports = { pick, randomInteger, uniqueId, uniqueEmail, uniquePassword };