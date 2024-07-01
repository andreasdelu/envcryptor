import fs from "fs";
import crypto from "crypto";
import { exec, execSync } from "child_process";

describe("Encrypt Command", () => {
	const inputFile = "tests/encrypt/.env";
	const outputFile = "tests/encrypt/.env.enc";
	let encryptionKey = null;
	const keyFile = "tests/encrypt/key.key";

	beforeAll(() => {
		fs.mkdirSync("tests/encrypt", { recursive: true });
		execSync(`node ./dist/bin/cli.js keygen -o ${keyFile}`);
		encryptionKey = fs.readFileSync(keyFile, "utf8");
		fs.writeFileSync(inputFile, "TEST_VAR=Hello");
	});

	afterAll(() => {
		fs.rmSync("tests/encrypt", { recursive: true });
	});

	it("should encrypt the environment file using a string encryption key", (done) => {
		exec(
			`node ./dist/bin/cli.js encrypt ${inputFile} ${outputFile} -s ${encryptionKey}`,
			(error, stdout, stderr) => {
				expect(error).toBeNull();
				expect(stderr).toBe("");
				expect(fs.existsSync(outputFile)).toBe(true);
				done();
			}
		);
	});

	it("should encrypt the environment file using a file encryption key", (done) => {
		exec(
			`node ./dist/bin/cli.js encrypt ${inputFile} ${outputFile} -f ${keyFile}`,
			(error, stdout, stderr) => {
				expect(error).toBeNull();
				expect(stderr).toBe("");
				expect(fs.existsSync(outputFile)).toBe(true);
				done();
			}
		);
	});
});
