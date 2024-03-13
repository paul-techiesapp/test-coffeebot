var net = require('net');
var host = '0.0.0.0';
var servers = [];
var ports = [3000];

// Create servers
ports.forEach(function (port) {

    var s = net.createServer(function (sock) {
        // We have a connection - a socket object is assigned to the connection automatically
        console.log('CONNECTED (' + sock.localPort + '): ' + sock.remoteAddress + ':' + sock.remotePort);
        const hb = heartBeat();
        console.log(hb);
        // Add a 'data' event handler to this instance of socket
        sock.on('data', function (data) {
            // convert socket data to string
            // console.log('on data', data.toString('ascii'));
            // post data to a server so it can be saved and stuff
            // postData(data.toString(), sock);
            const hb = heartBeat();
            // console.log(hb);
            sock.write(hb);

            // sock.write('You said "' + data + '"');
            // close connection
            // sock.end();
        });

        sock.on('error', function (error) {
            console.log('******* ERROR ' + error + ' *******');

            // close connection
            sock.end();
        });
    });

    s.listen(port, host, function () {
        console.log('Server listening on ' + host + ':' + s.address().port);
    });

    servers.push(s);
});

function heartBeat(vmc_no) {
    // console.log({
    //     "cmd": "hb",
    //     "vmc_no": 52303
    // })
    const data = {
      cmd: 'hb',
      vmc_no: 52303,
    };

    // // {"cmd":"hb","vmc_no":"52303"}

    const body = JSON.stringify(data);
    const header = packHeader(body.length);

    // srvlog.message_log.info('send : ' + body);

    const result = new Uint8Array(header.length + body.length);
    result.set(header.split('').map(c => c.charCodeAt(0)), 0);
    result.set(Buffer.from(body, 'latin1'), header.length);

    return result;
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