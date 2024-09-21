var http = require("http"),
  fs = require("fs"),
  ccav = require("./ccavutil.js"),
  crypto = require("crypto"),
  qs = require("querystring");

exports.postReq = function (request, response) {
  var body = "",
    // workingKey = '',	//Put in the 32-Bit key shared by CCAvenues.
    // accessCode = '',			//Put in the Access Code shared by CCAvenues.
    encRequest = "",
    formbody = "";

  //   console.log(request);

  const accessCode = "AVOY05KK31AF65YOFA";
  const workingKey = "B4E910BBC714BFAB0695086C999F1C9F";

  //Generate Md5 hash for the key and then convert in base64 string
  var md5 = crypto.createHash("md5").update(workingKey).digest();
  var keyBase64 = Buffer.from(md5).toString("base64");

  //Initializing Vector and then convert in base64 string
  var ivBase64 = Buffer.from([
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
    0x0c, 0x0d, 0x0e, 0x0f,
  ]).toString("base64");

  // request.on("data", function (data) {
  //   body += data;
  //   encRequest = ccav.encrypt(body, keyBase64, ivBase64);
  //   formbody =
  //     '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' +
  //     encRequest +
  //     '"><input type="hidden" name="access_code" id="access_code" value="' +
  //     accessCode +
  //     '"><script language="javascript">document.redirect.submit();</script></form>';
  // });

  // request.on("end", function () {
  //   response.writeHeader(200, { "Content-Type": "text/html" });
  //   response.write(formbody);
  //   response.end();
  // });

  const data = request.body;

  console.log(data, "data");

  const customReplacer = (key, value) => {
    // Convert each key-value pair into a string in the desired format
    return `${key}=${value}`;
  };

  const formData = Object.keys(data)
    .map((key) => customReplacer(key, data[key]))
    .join("&");
  console.log(formData);
  encRequest = ccav.encrypt(formData, keyBase64, ivBase64);

  response.send({ encRequest, accessCode });

  // axios
  //   .post(
  //     "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
  //   )
  //   .then((response) => {
  //     // The response data can be processed here
  //     // For example, you can extract the `encRequest` from the response and send it to the client

  //     // Create the HTML form
  //     const formbody = `
  //       <form id="nonseamless" method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction">
  //         <input type="hidden" id="encRequest" name="encRequest" value="${encRequest}">
  //         <input type="hidden" name="access_code" id="access_code" value="${accessCode}">
  //         <script language="javascript">document.redirect.submit();</script>
  //       </form>
  //     `;

  //     // Send the HTML form as a response
  //     response.writeHead(200, { "Content-Type": "text/html" });
  //     response.write(formbody);
  //     response.end();
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //     response.status(500).send("Internal Server Error");
  //   });

  return;
};
