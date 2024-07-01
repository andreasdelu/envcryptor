import fs from "fs";
import { exec, execSync } from "child_process";

describe("Decrypt Command", () => {
	const inputFile = "./tests/decrypt/.env.enc";
	const outputFile = "./tests/decrypt/.env";
	const keyFile = "./tests/decrypt/key.key";
	let encryptionKey = null;

	beforeAll(() => {
		fs.mkdirSync("tests/decrypt", { recursive: true });
		fs.writeFileSync(outputFile, "TEST_VAR=Hello", { encoding: "utf8" });
		execSync(`node ./dist/bin/cli.js keygen -o ${keyFile}`);
		encryptionKey = fs.readFileSync(keyFile, "utf8");
		execSync(
			`node ./dist/bin/cli.js encrypt ${outputFile} ${inputFile} -s ${encryptionKey}`
		);
	});

	afterAll(() => {
		if (fs.existsSync("tests/decrypt")) {
			fs.rmSync("tests/decrypt", { recursive: true });
		}
	});

	it("should decrypt the environment file using a string encryption key", (done) => {
		exec(
			`node ./dist/bin/cli.js decrypt ${inputFile} ${outputFile} -s ${encryptionKey}`,
			(error, stdout, stderr) => {
				expect(error).toBeNull();
				expect(stderr).toBe("");
				expect(fs.existsSync(outputFile)).toBe(true);
				done();
			}
		);
	});

	it("should decrypt the environment file using a file encryption key", (done) => {
		exec(
			`node ./dist/bin/cli.js decrypt ${inputFile} ${outputFile} -f ${keyFile}`,
			(error, stdout, stderr) => {
				expect(error).toBeNull();
				expect(stderr).toBe("");
				expect(fs.existsSync(outputFile)).toBe(true);
				done();
			}
		);
	});
});
