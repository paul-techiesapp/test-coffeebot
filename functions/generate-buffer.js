function generateBuffer(data) {
  const header = packHeader(data.length);
  const encoder = new TextEncoder('latin1');
  const body = data;

  const headerBytes = encoder.encode(header);
  const bodyBytes = encoder.encode(body);

  // Concatenate header and body bytes
  const combinedBytes = new Uint8Array(headerBytes.length + bodyBytes.length);
  combinedBytes.set(headerBytes);
  combinedBytes.set(bodyBytes, headerBytes.length);
  return combinedBytes;
  // return Buffer.from('10000000000' + JSON.stringify(data));
  // return encodePacket(data);

  // const body = JSON.stringify(data);
  // const header = packHeader(body.length);
  // console.log('header', body.length);
  // const result = new Uint8Array(header.length + body.length);
  // result.set(header.split('').map(c => c.charCodeAt(0)), 0);
  // result.set(Buffer.from(body, 'ascii'), header.length);

  // // set buffer with length and padding 
  // Buffer.from(body, )
  return result;
  // const body = JSON.stringify(data);
  //   const header = packHeader(body.length);
  //   const result = new Uint8Array(header.length + body.length);
  //   result.set(header.split('').map(c => c.charCodeAt(0)), 0);
  //   result.set(Buffer.from(body, 'ascii'), header.length);
  //   return result;
  // }
}

function packHeader(bodyLen) {
  let msgLen = bodyLen + 12; // Length of header (4 bytes) + Length of padding (8 bytes)
  let headerStr = '';

  for (let count = 0; count < 4; count++) {
    let char = msgLen & 0xff;
    char += '0'.charCodeAt(0);
    msgLen >>= 8;
    if (char > 255) {
      char -= 256;
      msgLen += 1;
    }
    headerStr += String.fromCharCode(char);
  }

  headerStr += '00000000';

  return headerStr;
}

function encodePacket(data) {
  // Convert JSON data to a string
  const jsonStr = JSON.stringify(data);

  // Calculate the total length of the packet, including the head
  const totalLength = jsonStr.length + 8; // Length of Head (4 bytes) + Length of Padding (4 bytes)

  // Convert total length to a 4-byte ASCII string
  const lengthStr = totalLength.toString().padStart(4, '0');

  // Calculate the length of the padding
  const paddingLength = totalLength - jsonStr.length - 4; // Subtracting the length of the head

  // Generate padding string (if necessary)
  const paddingStr = String.fromCharCode(paddingLength).repeat(paddingLength);

  // Combine the parts into the final encoded packet
  const encodedPacket = lengthStr + paddingStr + jsonStr;

  return encodedPacket;
}

// // Example JSON data
// const jsonData = {"key": "value"};

// // Encode the JSON data
// const encodedData = encodePacket(jsonData);

// console.log("Encoded Packet:", encodedData);

module.exports = generateBuffer;