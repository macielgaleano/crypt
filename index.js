const fs = require("fs");
const CryptoJS = require("crypto-js");
const forge = require("node-forge");
const NodeRSA = require("node-rsa");

const url =
  "checkout:8000/confirmation/eyJ0ZW5hbnRJZCI6ImVsdGVuYW50LGplIiwgInRyYW5zYWN0aW9uUmVmZXJlbmNlIjoiZWxpZCxqZSJ9.l_9BlRPNHdmtQtgVwfaK-kcVYOfCZvvWvGv211K_kDufaJX8J6oL8bB-b69gZHBgQDgw1uYFAknHG1AM_dCh7ECMzeE2xMrxqb2xnZUqhl1H2xSE3CQg0gpU3bE5mteUwqFXL0KPq0XC-K7X7zSNlN1QItx5j8Km2WlfYX1PnrqDAsnigheeY3o4u2bIALyO_nzhtpY7FFGzO1RXlUpf7IVM2YkeSdhPoJ0gIIyqHQsvWxmsmMHWD4V1K9wD9poibrKSo6coL5vKQJ2spU435z4309WyWClImcZM8MQY4kvDI7CvQci25KIo98VWsrOL9n9_g7uJREuB7bequSBUUQ";
const public = fs.readFileSync("./public.pem", { encoding: "utf8" });
const secret = "jXn2r5u8x/A?D(G+KbPdSgVkYp3s6v9y$B&E)H@McQfThWmZq4t7w!z%C*F-JaNd"; //hmac

const key = new NodeRSA(public);

const code = url.replace("checkout:8000/confirmation/", "");
const parts = code.split(".");

//Primera parte es el payload
//Segunda parte la firma encriptrada

const payload = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64url.parse(parts[0]));
const decrypt = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Base64url.parse(parts[1]));

console.log("payload", payload);

//Generar firma

const generateSignature = CryptoJS.HmacSHA256(payload, secret).toString();

console.log("generateSignature", generateSignature);

const decryptWithPubliKey = key.decrypt(decrypt, "base64");
console.log(decryptWithPubliKey);
