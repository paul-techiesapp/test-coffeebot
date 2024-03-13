function generateBuffer(data) {
  return Buffer.from('10000000000'+JSON.stringify(data));
  // const body = JSON.stringify(data);
  //   const header = packHeader(body.length);
  //   const result = new Uint8Array(header.length + body.length);
  //   result.set(header.split('').map(c => c.charCodeAt(0)), 0);
  //   result.set(Buffer.from(body, 'ascii'), header.length);
  //   return result;
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
}

module.exports = generateBuffer;