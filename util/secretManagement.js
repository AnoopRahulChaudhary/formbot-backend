import bcrypt from "bcrypt";

const saltRounds = 10;

async function encodeSecret(secret) {
  return await bcrypt.hash(secret.toString(), saltRounds);
}

export { encodeSecret };
