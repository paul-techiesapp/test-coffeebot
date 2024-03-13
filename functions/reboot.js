// const nanoid = require('nanoid');
const generateBuffer = require('./generate-buffer');

// const sessionId = nanoid.customAlphabet('1234567890', 18)

function reboot() {
  console.log('-- Reboot --');
  const data = {
    cmd: "reboot",
    vmc_no: 52303,
    session_id: Math.random() * 100,
  }
  return generateBuffer(data);
}

module.exports = reboot;