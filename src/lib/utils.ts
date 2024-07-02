import crypto from "crypto";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();

export function encrypt(text: string, encKey: string) {
	try {
		const combined = Buffer.from(encKey, "hex");
		const encryptionKey = combined.subarray(0, 32);
		const iv = combined.subarray(32, 48);
		const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
		let encrypted = cipher.update(text, "utf8", "hex");
		encrypted += cipher.final("hex");
		return encrypted;
	} catch (error) {
		console.error("Error encrypting text: ", error);
		throw error;
	}
}

export function encryptEnv(filePath: string, encKey: string) {
	try {
		const ENV_PATH = filePath || ".env";
		// Check if file exists
		if (!fs.existsSync(ENV_PATH)) {
			throw new Error(`The file ${ENV_PATH} does not exist.`);
		}
		// Load the env file
		const envString = fs.readFileSync(ENV_PATH, "utf8");

		// Encrypt the envString
		const encryptedEnvString = encrypt(envString, encKey);

		return encryptedEnvString;
	} catch (error) {
		console.error("Error encrypting environment variables: ", error);
		throw error;
	}
}

export function decrypt(encrypted: string, encKey: string) {
	try {
		const combined = Buffer.from(encKey, "hex");
		const encryptionKey = combined.subarray(0, 32);
		const iv = combined.subarray(32, 48);
		const decipher = crypto.createDecipheriv("aes-256-cbc", encryptionKey, iv);
		let decrypted = decipher.update(encrypted, "hex", "utf8");
		decrypted += decipher.final("utf8");
		return decrypted;
	} catch (error) {
		console.error("Error decrypting text: ", error);
		throw error;
	}
}

export function decryptEnv(filePath: string, encKey: string) {
	try {
		const ENV_ENC_PATH = path.resolve(__dirname, filePath) || `.env.enc`;
		// Check if file exists
		if (!fs.existsSync(ENV_ENC_PATH)) {
			throw new Error(`The file ${ENV_ENC_PATH} does not exist.`);
		}
		// Load the encrypted env file
		const ENV_ENC = fs.readFileSync(ENV_ENC_PATH, "utf8");

		if (!ENV_ENC) {
			return "";
		}
		// Decrypt the encrypted envString
		const decryptedEnvString = decrypt(ENV_ENC, encKey);
		return decryptedEnvString;
	} catch (error) {
		console.error("Error decrypting environment variables: ", error);
		throw error;
	}
}

export function exposeEnv(input: string, output: string, encKey: string) {
	const decryptedEnv = decryptEnv(input, encKey);

	fs.writeFileSync(output, decryptedEnv);
}

export function packEnv(input: string, output: string, encKey: string) {
	try {
		// Encrypt the env file
		const encryptedEnv = encryptEnv(input, encKey);
		// Pack the encrypted env file
		fs.writeFileSync(output, encryptedEnv);
	} catch (error) {
		console.error("Error packing environment variables: ", error);
		throw error;
	}
}

export function parseEnv(envString: string) {
	const env: {
		[key: string]: string;
	} = {};
	const lines = envString.split("\n");
	for (let line of lines) {
		line = line.trim(); // Trim whitespace
		if (line === "" || line.startsWith("#")) continue; // Skip empty lines and comments
		const [key, value] = line.split("=", 2); // Split by the first "=" only
		env[key] = value;
	}
	return env;
}
