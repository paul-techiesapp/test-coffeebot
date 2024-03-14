// const nanoid = require('nanoid');
const generateBuffer = require('./generate-buffer');

// const sessionId = nanoid.customAlphabet('1234567890', 18)

function rinsing() {
  console.log('-- Rinsing --');
  const data = {
    cmd: "rinsing",
    vmc_no: 66119,
    session_id: Math.random() * 100,
  }
  return generateBuffer(data);
}

module.exports = rinsing;