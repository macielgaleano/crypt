const fs = require("fs");
const CryptoJS = require("crypto-js");
//const forge = require("node-forge");
const NodeRSA = require("node-rsa");
const url =
  "http://checkout:8000/confirmation/eyJ0ZW5hbnRJZCI6IngzNzJzU1liIiwgInRyYW5zYWN0aW9uUmVmZXJlbmNlIjoiMTA5NTgxNSJ9.VpCRLymdNvjzluJJXXMfHo1AVAfIfWrVKtMAgCr7SszLMslzqyFXLum7GnlxVXcOSQdXivVqlolDZa_HW-ZTQIeLTcG4ot8Are1a3Tc69iGrKTXl9LmRQ9rmBIdi6__Zu7hyp2oMchhQELoGOLpGFleJIN5Ur-TQB0uKGU9T7ejCR0fpCL2Q2PAhbqdVqlm_HYXNrf0QO2ytvaBBC80OkAJug4g86QJ4QRjAOxJ9C73p2gdPdjg3FHQFzcVZhZvzom4Q28UvRzlE4LxsBGFlLDJDdzrXRUDfn8JlkQwiu_K2Anqy8m-apOMQLrYdlz8EkbmQ1-N4ArGCmeUY0whT0A";
const public = fs.readFileSync("./public.pem", { encoding: "utf8" });
const secret = "jXn2r5u8x/A?D(G+KbPdSgVkYp3s6v9y$B&E)H@McQfThWmZq4t7w!z%C*F-JaNd"; //hmac
const key = new NodeRSA(public);
const code = url.replace("http://checkout:8000/confirmation/", "");
const parts = code.split(".");
65;
const payload = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64url.parse(parts[0]));
const decrypt = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Base64url.parse(parts[1]));
const generateSignature = CryptoJS.HmacSHA256(payload, secret).toString();
const decryptWithPubliKey = key.decryptPublic(decrypt, "hex"); //type Encoding = 'ascii' | 'utf8' | 'utf16le' | 'ucs2' | 'latin1' | 'base64' | 'hex' | 'binary' | 'buffer';
console.log(JSON.parse(payload));
if (decryptWithPubliKey === generateSignature) console.log("si");
