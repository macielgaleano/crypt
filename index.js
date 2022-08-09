const fs = require("fs");
const CryptoJS = require("crypto-js");
const EncryptRsa = require("hybrid-crypto-js").Crypt; //require("encrypt-rsa").default;

const url =
  "checkout:8000/confirmation/eyJ0ZW5hbnRJZCI6ImVsdGVuYW50LGplIiwgInRyYW5zYWN0aW9uUmVmZXJlbmNlIjoiZWxpZCxqZSJ9.l_9BlRPNHdmtQtgVwfaK-kcVYOfCZvvWvGv211K_kDufaJX8J6oL8bB-b69gZHBgQDgw1uYFAknHG1AM_dCh7ECMzeE2xMrxqb2xnZUqhl1H2xSE3CQg0gpU3bE5mteUwqFXL0KPq0XC-K7X7zSNlN1QItx5j8Km2WlfYX1PnrqDAsnigheeY3o4u2bIALyO_nzhtpY7FFGzO1RXlUpf7IVM2YkeSdhPoJ0gIIyqHQsvWxmsmMHWD4V1K9wD9poibrKSo6coL5vKQJ2spU435z4309WyWClImcZM8MQY4kvDI7CvQci25KIo98VWsrOL9n9_g7uJREuB7bequSBUUQ";
const public = fs.readFileSync("./public.pem", { encoding: "utf8" });
const secret = "jXn2r5u8x/A?D(G+KbPdSgVkYp3s6v9y$B&E)H@McQfThWmZq4t7w!z%C*F-JaNd"; //hmac

const key =
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyljdiGyFjnv3wK2BD04XdYPhc9fzcpNQ0Czx41tiOKSzFeKsOd1+qaS9+OMzwMHenJ/7ta1bOUE6mZlphjEX8Ihxhv5KZ22jUjZG7d5zlAgD695dvklQCZTsYiC2dImlHBE6PcEaub381UQ3k9JmwbltLBaMzK+mM3q6LD04GQj4u4D4W3iBdcGCI+6xJ2nw5qpa0QS2SPKNAabOFE/9K/y+p0ybFs823/ZRv7o8D6B8rAjvEMG5D7Vawxs2Y+vIZeH9Ujfz977v4RcWFX7EtgA2yPeU9mj/nmxtnL1qCMsqalTH8t8IRZBnVHY04iXVS6kiQKAqHYdGqB6OQ/1lzQIDAQAB";

const code = url.replace("checkout:8000/confirmation/", "");
const parts = code.split(".");

//Primera parte es el payload
//Segunda parte la firma encriptrada

const payload = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64url.parse(parts[0]));
const decrypt = CryptoJS.enc.Base64url.parse(parts[1]);

//Generar firma

console.log(public);

const generateSignature = CryptoJS.HmacSHA256(payload, secret).toString();
const encryptRsa = new EncryptRsa();
const decryptWithPubliKey = encryptRsa.decrypt(key, decrypt);

console.log(decryptWithPubliKey);
