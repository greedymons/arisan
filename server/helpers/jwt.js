const jwt = require("jsonwebtoken")
require("dotenv").config({
  path: "../.env"
})
const SECRET_KEY = process.env.SECRET_KEY

function generateToken(params) {
  const token = jwt.sign(params, SECRET_KEY)
  return token
}
function cekToken(params) {
  return jwt.verify(params, SECRET_KEY)
}

module.exports = { generateToken, cekToken }