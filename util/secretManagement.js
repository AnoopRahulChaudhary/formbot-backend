import bcrypt from "bcrypt";

const saltRounds = 10;

async function encodeSecret(secret) {
  return await bcrypt.hash(secret.toString(), saltRounds);
}

async function matchSecret(secret, secretHash) {
  return await bcrypt.compare(secret.toString(), secretHash);
}

export { encodeSecret, matchSecret };
