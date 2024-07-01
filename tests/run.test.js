import fs from "fs";
import { exec, execSync } from "child_process";

describe("Run Command", () => {
	const folder = "./tests/run";
	const envFile = `${folder}/.env`;
	const encodedFile = `${folder}/.env.enc`;
	const keyFile = `${folder}/key.key`;
	let encryptionKey = null;

	beforeAll(() => {
		fs.mkdirSync(folder, { recursive: true });
		fs.writeFileSync(envFile, "#Test comment\nTEST_VAR=Hello", {
			encoding: "utf8",
		});
		execSync(`node ./dist/bin/cli.js keygen -o ${keyFile}`);
		encryptionKey = fs.readFileSync(keyFile, "utf8");
		execSync(
			`node ./dist/bin/cli.js encrypt ${envFile} ${encodedFile} -s ${encryptionKey}`
		);
		fs.writeFileSync(
			`${folder}/script.js`,
			`console.log(process.env.TEST_VAR)`,
			{
				encoding: "utf8",
			}
		);
	});

	afterAll(() => {
		if (fs.existsSync(folder)) {
			fs.rmSync(folder, { recursive: true });
		}
	});

	it("should set the environment variables and run a command using a string encryption key", (done) => {
		exec(
			`node ./dist/bin/cli.js run -e ${encodedFile} -s ${encryptionKey} node ${folder}/script.js`,
			(error, stdout, stderr) => {
				expect(error).toBeNull();
				expect(stderr).toBe("");
				expect(stdout).toBe("Hello\n");
				done();
			}
		);
	});

	it("should set the environment variables and run a command using a file encryption key", (done) => {
		exec(
			`node ./dist/bin/cli.js run -e ${encodedFile} -f ${keyFile} node ${folder}/script.js`,
			(error, stdout, stderr) => {
				expect(error).toBeNull();
				expect(stderr).toBe("");
				expect(stdout).toBe("Hello\n");
				done();
			}
		);
	});
});
