import { execSync } from "child_process";
import fs from "fs";
import loadEnv from "../dist/lib/loadEnv.js";

describe("LoadEnv Function", () => {
	const encryptedFile = "./tests/loadEnv/.env.enc";
	const keyFile = "./tests/loadEnv/key.key";
	let encryptionKey: string;

	beforeAll(() => {
		fs.mkdirSync("tests/loadEnv", { recursive: true });
		fs.writeFileSync("./tests/loadEnv/.env", "TEST_VAR=Hello");
		execSync(`node ./dist/bin/cli.js keygen -o ${keyFile}`);
		encryptionKey = fs.readFileSync(keyFile, "utf8");
		execSync(
			`node ./dist/bin/cli.js encrypt ./tests/loadEnv/.env ${encryptedFile} -s ${encryptionKey}`
		);
	});

	afterAll(() => {
		if (fs.existsSync("tests/loadEnv"))
			fs.rmSync("tests/loadEnv", { recursive: true });
	});

	it("should load the environment file using a string encryption key", () => {
		loadEnv({ path: encryptedFile, key: encryptionKey });
		expect(process.env.TEST_VAR).toBe("Hello");
	});

	it("should load the environment file using a file encryption key", () => {
		loadEnv({ path: encryptedFile, key: keyFile });
		expect(process.env.TEST_VAR).toBe("Hello");
	});
});
