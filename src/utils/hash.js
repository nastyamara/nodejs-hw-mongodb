import bcrypt from "bcrypt";

export const compareHash = (value, hash) => bcrypt.compare(value, hash);                                            