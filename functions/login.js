const moment = require('moment');
const generateBuffer = require('./generate-buffer');

function login() {
  console.log('-- Login --');
  const data = {
    cmd: "login_r",
    vmc_no: 66119,
    carrier_code: "TW-00418",
    date_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    server_list: "13.214.65.153",
    ret: 0
  }
  return generateBuffer(data);
}

module.exports = login;