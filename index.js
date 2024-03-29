const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// listen to socket io connection
io.on("connection", (socket) => {
  console.log("New connection from: " + socket.handshake.address);
});



// express to handle all requests
app.get("/", (req, res) => {
  console.log('------ GET REQUEST ------');
  console.log(req);
  res.status(200).json({ message: "GET request received" });
});

app.post("/", (req, res) => {
  console.log('------ POST REQUEST ------');
  console.log(req);
  res.status(200).json({ message: "POST request received" });
});

app.all("*", (req, res) => {
  console.log('------ ALL REQUEST ------');
  console.log(req);
  res.status(200).json({ message: "ALL request received" });
});

server.listen(3000, (req, res) => {
  // console.log("TEST Server started on port 3000");
  // keep repeat the heartbeat call every 5 seconds
  // const hbRes = heartBeat('52303');
  // console.log(hbRes);
  heartBeat('52303');
  setInterval(() => {
    heartBeat('52303');
  }, 5000);

  // console.log(packedLoginr);
});


// function getCurrentTime(FormatStr) {
//   // Time format: 20170301162559  "%Y%m%d%H%M%S"
//   const now = new Date();
//   const year = now.getFullYear();
//   const month = String(now.getMonth() + 1).padStart(2, '0');
//   const day = String(now.getDate()).padStart(2, '0');
//   const hours = String(now.getHours()).padStart(2, '0');
//   const minutes = String(now.getMinutes()).padStart(2, '0');
//   const seconds = String(now.getSeconds()).padStart(2, '0');

//   return `${year}${month}${day}${hours}${minutes}${seconds}`;
// }

// function packHeader(bodyLen) {
//   let msgLen = bodyLen + 12;
//   let headerStr = '';
//   let count = 4;

//   while (count) {
//     let char = msgLen & 0xff;
//     char += '0'.charCodeAt(0);
//     msgLen >>= 8;

//     if (char > 255) {
//       char -= 256;
//       msgLen += 1;
//     }

//     headerStr += String.fromCharCode(char);
//     count -= 1;
//   }

//   headerStr += '00000000';

//   return headerStr;
// }

// function packLoginr(vmc_no, server_list, carrier_code) {
//   const data = {
//     'cmd': 'login_r',
//     'vmc_no': vmc_no,
//     'carrier_code': carrier_code,
//     'ret': 0,
//     'date_time': getCurrentTime("%Y-%m-%d %H:%M:%S"),
//     'server_list': server_list
//   };

//   const body = JSON.stringify(data);
//   const header = packHeader(body.length);

//   console.log('send : ' + body);

//   return new TextEncoder().encode(header + body);
// }

// const heartBeat = () => {
//   return new Promise(async (resolve, reject) => {
//     // Buffer initialization
//     let ch_send_buf = new Uint8Array(2000);
//     ch_send_buf.fill(0);

//     // Setting initial bytes in the buffer
//     ch_send_buf.fill('0'.charCodeAt(0), 4, 12);

//     // Constructing JSON content
//     let st_send_content = `{"cmd":"hb","vmc_no":"52303"}`;

//     // Calculating data length
//     let send_data_len = st_send_content.length + 12;

//     // Setting data length in buffer
//     let send_data_len_add = send_data_len + 0x30303030;
//     ch_send_buf[0] = send_data_len_add & 0xff;
//     ch_send_buf[1] = (send_data_len_add >> 8) & 0xff;
//     ch_send_buf[2] = (send_data_len_add >> 16) & 0xff;
//     ch_send_buf[3] = (send_data_len_add >> 24) & 0xff;

//     // Copying JSON content into buffer
//     for (let i = 0; i < st_send_content.length; i++) {
//       ch_send_buf[12 + i] = st_send_content.charCodeAt(i);
//     }

//     // Assuming pCTcpServer is an object with m_map_StClientInfo property
//     // if (pCTcpServer.m_map_StClientInfo[fd]) {
//     //   pCTcpServer.m_map_StClientInfo[fd].time_tick = 0;
//     // }

//     // Assuming there is an asynchronous equivalent for sending data (e.g., fetch in a browser environment)
//     try {
//       // Replace this with the appropriate asynchronous send operation in your environment
//       // For example, using fetch in a browser environment
//       const res = await fetch('183.171.98.225', {
//         method: 'POST',
//         body: ch_send_buf.slice(0, send_data_len),
//       });

//       console.log(res);
//     } catch (error) {
//       console.error("ReceiveData-------- send error");
//     }
//   })
// }

const srvlog = {
  message_log: {
    info: function (message) {
      console.log(message); // Replace with your logging implementation
    }
  }
};

function getCurrentTime(formatStr) {
  // Time format: 20170301162559  "%Y%m%d%H%M%S"
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return formatStr
    .replace('%Y', year)
    .replace('%m', month)
    .replace('%d', day)
    .replace('%H', hours)
    .replace('%M', minutes)
    .replace('%S', seconds);
}

function packHeader(bodyLen) {
  let msgLen = bodyLen + 12;
  let headerStr = '';
  let count = 4;

  while (count) {
    let char = msgLen & 0xff;
    char += '0'.charCodeAt(0);
    msgLen >>= 8;

    if (char > 255) {
      char -= 256;
      msgLen += 1;
    }

    headerStr += String.fromCharCode(char);
    count -= 1;
  }

  headerStr += '00000000';

  return headerStr;
}

function packLoginr(vmc_no, server_list, carrier_code) {
  const data = {
    cmd: 'login_r',
    vmc_no: vmc_no,
    carrier_code: carrier_code,
    ret: 0,
    date_time: getCurrentTime('%Y-%m-%d %H:%M:%S'),
    server_list: server_list
  };

  const body = JSON.stringify(data);
  const header = packHeader(body.length);

  srvlog.message_log.info('send : ' + body);

  const result = new Uint8Array(header.length + body.length);
  result.set(header.split('').map(c => c.charCodeAt(0)), 0);
  result.set(Buffer.from(body, 'latin1'), header.length);

  return result;
}

function heartBeat(vmc_no) {
  console.log({
    "cmd": "hb",
    "vmc_no": 52303
  })
  // const data = {
  //   cmd: 'hb',
  //   vmc_no: vmc_no,
  // };

  // // {"cmd":"hb","vmc_no":"52303"}

  // const body = JSON.stringify(data);
  // const header = packHeader(body.length);

  // srvlog.message_log.info('send : ' + body);

  // const result = new Uint8Array(header.length + body.length);
  // result.set(header.split('').map(c => c.charCodeAt(0)), 0);
  // result.set(Buffer.from(body, 'latin1'), header.length);

  // return result;
}

