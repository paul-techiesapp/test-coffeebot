var net = require('net');
const generateBuffer = require('./functions/generate-buffer');
const login = require('./functions/login');
const openDoor = require('./functions/open-door');
const machineLock = require('./functions/machine-lock');
const openSmallDoor = require('./functions/open-small-door');
const rinsing = require('./functions/rinsing');
var host = '0.0.0.0';
var servers = [];
var ports = [3000];

// Create servers
ports.forEach(function (port) {

    var s = net.createServer(function (sock) {
        // We have a connection - a socket object is assigned to the connection automatically
        console.log('CONNECTED (' + sock.localPort + '): ' + sock.remoteAddress + ':' + sock.remotePort);

        // Return client HeartBeat every 5 seconds
        heartBeat();
        setInterval(() => {
            const hb = heartBeat();
            sock.write(hb);
        }, 5000);

        sock.on('data', function (data) {
            // data from the client is a buffer
            const clientData = data.toString('ascii');
            console.log('### CLIENT INPUT ###')
            console.log(clientData);
            console.log('### CLIENT INPUT END ###\n')

            const loginRes = login();
            console.log(loginRes.toString('latin1'));
            sock.write(loginRes);

            // const openDoorRes = openDoor();
            // console.log(openDoorRes.toString('latin1'));
            // sock.write(openDoorRes);

            // const openSmallDoorRes = openSmallDoor();
            // console.log(openSmallDoorRes.toString('latin1'));
            // sock.write(openSmallDoorRes);

            const rinsingRes = rinsing();
            console.log(rinsingRes.toString('latin1'));
            sock.write(rinsingRes);

            // wait 5 seconds
            // setTimeout(() => {
                
            //     // sock.end();
            // }, 5000);

            // const closeDoorRes = machineLock();
            // console.log(closeDoorRes.toString('latin1'));
            // sock.write(closeDoorRes);

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
    const data = {
        cmd: 'hb',
        vmc_no: 52303,
    };
    console.log('-- HB --')
    return generateBuffer(data);
}
