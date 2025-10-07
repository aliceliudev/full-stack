import { writeFileSync, readFileSync } from "node:fs";
const user = [{ name: "adam ondra", email: "adam.ondra@example.com" }];

const userJSON = JSON.stringify(user);
writeFileSync("users.json", userJSON);
const readUserJSON = readFileSync("users.json");

const readUser = JSON.parse(readUserJSON);

console.log(readUser);
