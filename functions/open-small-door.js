// const nanoid = require('nanoid');
const generateBuffer = require('./generate-buffer');

// const sessionId = nanoid.customAlphabet('1234567890', 18)

function openSmallDoor() {
  console.log('-- Open Small Door --');
  const data = {
    cmd: "opensmalldoor",
    vmc_no: 66119,
    session_id: Math.random() * 100,
  }
  return generateBuffer(data);
}

module.exports = openSmallDoor;