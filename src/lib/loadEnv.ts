import { decryptEnv } from "./utils.js";
import fs from "fs";

/**
 * Load the environment variables from the encrypted file
 * @param {Object} options - The options object
 * @param {String} options.path - The path to the encrypted file
 * @param {String} options.key - The encryption key - either as a string or a .key file
 *
 * @returns {Void}
 *
 * @example
 * loadEnv({
 *  path: ".env.enc",
 *  key: "key.key"
 * });
 *
 * @example
 * loadEnv({
 *  path: ".env.enc",
 *  key: "987cec1d521624928485f59f8d9d9ffbcc32a1d4e9dc13dded2ce289d85fb400351b4c90265ebf6ed32f6a65d624111d"
 * });
 */

export default function loadEnv({ path, key }: { path: string; key: string }) {
	try {
		// Check if the path is provided
		if (!path) {
			throw new Error("Please provide a path to the encrypted file");
		}

		// Check if the file exists
		if (!fs.existsSync(path)) {
			throw new Error(`The file ${path} does not exist.`);
		}

		// Check if the key is provided
		if (!key) {
			throw new Error("Please provide an encryption key");
		}

		// Check if the key is a file
		if (fs.existsSync(key)) {
			key = fs.readFileSync(key, { encoding: "utf-8" });
		}

		// Load the env file
		const envString = decryptEnv(path, key);

		// Parse the envString and set the environment variables
		envString
			.split("\n")
			.filter((line) => !line.trim().startsWith("#"))
			.map((line) => {
				const [key, value] = line.split("=");
				process.env[key] = value;
			});
	} catch (error) {
		console.error("Error loading environment variables: ", error);
		throw error;
	}
}
