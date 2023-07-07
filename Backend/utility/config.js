require('dotenv').config();

const { MONGO_URI, PORT, SECRET_KEY, SECRET_IV, ENCRYPTION_METHOD } = process.env

module.exports = {
  secret_key: SECRET_KEY,
  secret_iv: SECRET_IV,
  encryption_method: ENCRYPTION_METHOD
}