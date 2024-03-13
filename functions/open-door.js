// const nanoid = require('nanoid');
const generateBuffer = require('./generate-buffer');

// const sessionId = nanoid.customAlphabet('1234567890', 18)

function openDoor() {
  console.log('-- Login --');
  const data = {
    cmd: "opendoor",
    vmc_no: 52303,
    session_id: Math.random() * 100,
  }
  return generateBuffer(data);
}

module.exports = openDoor;