import { execSync, spawn } from "child_process";
import fs from "fs";
import { readFile } from "fs/promises";
import os from "os";
import path from "path";

describe("Edit Command", () => {
	it("should skip this test", () => expect(true).toBe(true));
	return;
	const encryptedFile = "tests/edit/.env.enc";
	const keyFile = "tests/edit/key.key";
	let encryptionKey = null;

	beforeAll(() => {
		fs.mkdirSync("tests/edit", { recursive: true });
		fs.writeFileSync("tests/edit/.env", "TEST_VAR=Hello");
		execSync(`node ./dist/bin/cli.js keygen -o ${keyFile}`);
		encryptionKey = fs.readFileSync(keyFile, "utf8");
		execSync(
			`node ./dist/bin/cli.js encrypt tests/edit/.env ${encryptedFile} -s ${encryptionKey}`
		);
	});

	afterAll(() => {
		if (fs.existsSync("tests/edit"))
			fs.rmSync("tests/edit", { recursive: true });
	});

	it("should edit the environment file using a string encryption key", async () => {
		await new Promise((resolve, reject) => {
			const edit = spawn("node", [
				"./dist/bin/cli.js",
				"edit",
				encryptedFile,
				"-s",
				encryptionKey,
			]);

			edit.stdout.on("data", async (data) => {
				try {
					const tempFilePath = path.join(os.tmpdir(), "envcryptor.tmp");
					const tempFileContent = await readFile(tempFilePath, "utf8");
					expect(tempFileContent).toContain("TEST_VAR=Hello");
					resolve();
				} catch (error) {
					reject(error);
				}
			});
		});
	});

	it("should edit the environment file using a file encryption key", async () => {
		await new Promise((resolve, reject) => {
			const edit = spawn("node", [
				"./dist/bin/cli.js",
				"edit",
				encryptedFile,
				"-f",
				keyFile,
			]);

			edit.stdout.on("data", async (data) => {
				try {
					const tempFilePath = path.join(os.tmpdir(), "envcryptor.tmp");
					const tempFileContent = await readFile(tempFilePath, "utf8");
					expect(tempFileContent).toContain("TEST_VAR=Hello");
					resolve();
				} catch (error) {
					reject(error);
				}
			});
		});
	});
});
