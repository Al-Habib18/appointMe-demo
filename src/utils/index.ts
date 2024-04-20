/** @format */

const bcrypt = require("bcryptjs");

const generateHash = async (payload: string, saltRound = 10) => {
    const salt = await bcrypt.genSalt(saltRound);
    return bcrypt.hash(payload, salt);
};

const hasMatched = async (raw: string, hash: string) => {
    const result = await bcrypt.compare(raw, hash);
    return result;
};
export { generateHash, hasMatched };
