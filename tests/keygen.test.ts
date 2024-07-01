import fs from "fs";
import { exec } from "child_process";

describe("Keygen Command", () => {
	const outputFile = "tests/keygen/key.key";

	beforeAll(() => {
		fs.mkdirSync("tests/keygen", { recursive: true });
	});

	afterAll(() => {
		fs.rmSync("tests/keygen", { recursive: true });
	});

	it("should generate a new encryption key and save to file", (done) => {
		exec(
			`node ./dist/bin/cli.js keygen -o ${outputFile}`,
			(error, stdout, stderr) => {
				expect(error).toBeNull();
				expect(stderr).toBe("");
				expect(fs.existsSync(outputFile)).toBe(true);
				done();
			}
		);
	});

	it("should generate a new encryption key and print to console", (done) => {
		exec(`node ./dist/bin/cli.js keygen`, (error, stdout, stderr) => {
			expect(error).toBeNull();
			expect(stderr).toBe("");
			const trimmed = stdout.trim();
			expect(trimmed).toMatch(/^[a-f0-9]{96}$/); // Check if the output is a 96-character hex string
			done();
		});
	});
});
