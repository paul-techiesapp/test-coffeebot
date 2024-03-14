// const nanoid = require('nanoid');
const generateBuffer = require('./generate-buffer');

// const sessionId = nanoid.customAlphabet('1234567890', 18)

function openDoor() {
  console.log('-- Open Door --');
  const data = {
    cmd: "opendoor",
    vmc_no: 39730,
    session_id: Math.random() * 100,
  }
  return generateBuffer(data);
}

module.exports = openDoor;