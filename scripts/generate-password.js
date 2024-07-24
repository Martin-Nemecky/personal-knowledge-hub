"use strict";

const bcrypt = require("bcrypt");
const len = process.argv.length;
if (len < 3 || len > 3) {
	throw new Error("Wrong number of arguments");
}
bcrypt.hash(process.argv[2], 10).then((data) => {
	console.log("Generated password: " + data);
});
