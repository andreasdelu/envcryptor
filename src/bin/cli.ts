#!/usr/bin/env node

import fs from "fs";
import { Command } from "commander";
import {
	decryptEnv,
	encrypt,
	exposeEnv,
	packEnv,
	parseEnv,
} from "../lib/utils.js";
import { execSync } from "child_process";
import os from "os";
import crypto from "crypto";

const program = new Command();

program
	.name("env-cryptor")
	.description("A tool to encrypt and decrypt environment variables")
	.version("1.0.0");

program
	.command("encrypt")
	.description("encrypt the environment variables")
	.argument("<input>", "input file")
	.argument("<output>", "output file")
	.option("-s, --str <string>", "encryption key - as string")
	.option("-f, --file <file>", "encryption key - as .key file")
	.action(
		(
			input: string,
			output: string,
			options: {
				str?: string;
				file?: string;
			}
		) => {
			const { str, file } = options;
			if (!str && !file)
				return console.error(
					"Please provide an encryption key - either as a string or a .key file"
				);
			if (str && file)
				return console.error(
					"Please provide only one encryption key - either as a string or a .key file"
				);

			let encKey;
			if (str) encKey = str;
			if (file)
				if (!fs.existsSync(file))
					// Check if the file exists
					return console.error(`The file ${file} does not exist.`);
				else encKey = fs.readFileSync(file, { encoding: "utf-8" });
			if (!encKey) return console.error("Error reading the encryption key");

			packEnv(input, output, encKey);
		}
	);

program
	.command("decrypt")
	.description("decrypt the environment variables")
	.argument("<input>", "input file")
	.argument("<output>", "output file")
	.option("-s, --str <string>", "encryption key - as string")
	.option("-f, --file <file>", "encryption key - as .key file")
	.action(
		(
			input: string,
			output: string,
			options: {
				str?: string;
				file?: string;
			}
		) => {
			const { str, file } = options;
			if (!str && !file)
				return console.error(
					"Please provide an encryption key - either as a string or a .key file"
				);
			if (str && file)
				return console.error(
					"Please provide only one encryption key - either as a string or a .key file"
				);

			let encKey;
			if (str) encKey = str;
			if (file)
				if (!fs.existsSync(file)) {
					return console.error(`The file ${file} does not exist.`);
				} else {
					encKey = fs.readFileSync(file, { encoding: "utf-8" });
				}
			if (!encKey) return console.error("Error reading the encryption key");

			exposeEnv(input, output, encKey);
		}
	);

program
	.command("edit")
	.description("edit the environment variables")
	.argument("<file>", "encrypted env file")
	.option("-s, --str <string>", "encryption key - as string")
	.option("-f, --file <file>", "encryption key - as .key file")
	.action(
		(
			filePath: string,
			options: {
				str?: string;
				file?: string;
			}
		) => {
			const { str, file } = options;
			if (!str && !file)
				return console.error(
					"Please provide an encryption key - either as a string or a .key file"
				);
			if (str && file)
				return console.error(
					"Please provide only one encryption key - either as a string or a .key file"
				);

			let encKey;
			if (str) encKey = str;
			if (file)
				if (!fs.existsSync(file)) {
					// Check if the file exists
					return console.error(`The file ${file} does not exist.`);
				} else {
					encKey = fs.readFileSync(file, { encoding: "utf-8" });
				}
			if (!encKey) return console.error("Error reading the encryption key");

			// check if the file path exists
			if (!fs.existsSync(filePath)) {
				const helpMessage = `ENV_CRYPTOR\n# Encrypted environment variables\n`;
				const encryptedHelp = encrypt(helpMessage, encKey);
				fs.writeFileSync(filePath, encryptedHelp, { encoding: "utf-8" });
			}

			const tempFilePath = os.tmpdir() + "/envcryptor.tmp";
			try {
				exposeEnv(filePath, tempFilePath, encKey);
				const editor = process.env.EDITOR || "nano";
				execSync(`${editor} ${tempFilePath}`, {
					stdio: "inherit",
				});
				packEnv(tempFilePath, filePath, encKey);
				fs.unlinkSync(tempFilePath);
			} catch (error) {
				console.error("Error editing environment variables: ", error);
				fs.unlinkSync(tempFilePath);
				throw error;
			}
		}
	);

program
	.command("keygen")
	.description(
		"generate a new encryption key - either as a string or a .key file"
	)
	.option("-o, --output <file>", "output file")
	.action((options: { output?: string }) => {
		const { output } = options;
		const encKey = crypto.randomBytes(32).toString("hex");
		const encIv = crypto.randomBytes(16).toString("hex");
		const combined = `${encKey}${encIv}`;
		if (output) {
			const outputExt = output.split(".").pop();
			if (outputExt !== "key") {
				console.error("Output file must have a .key extension");
				return;
			}
			fs.writeFileSync(output, combined, { encoding: "utf-8" });
			console.log(`Encryption key saved to ${output}`);
		} else {
			console.log(combined);
		}
	});

program
	.command("run")
	.argument("<env>", "encrypted .env file")
	.option("-f, --file <file>", "path to the .key file")
	.option("-s, --str <string>", "encryption key - as string")
	.allowUnknownOption(true)
	.allowExcessArguments(true)
	.action((env: string, options, command) => {
		const { file, str } = options;
		if (file && str) {
			console.error(
				"Please provide only one encryption key - either as a string or a .key file"
			);
			return;
		}

		let encKey: string | undefined;
		if (str) encKey = str;
		if (file) {
			if (!fs.existsSync(file)) {
				console.error(`The file ${file} does not exist.`);
				return;
			} else {
				encKey = fs.readFileSync(file, { encoding: "utf-8" });
			}
		}
		if (!encKey) {
			console.error("Error reading the encryption key");
			return;
		}

		const decryptedEnv = decryptEnv(env, encKey);
		const parsedEnv = parseEnv(decryptedEnv);
		const envString = Object.entries(parsedEnv)
			.map(([key, value]) => `${key}=${value}`)
			.join(" ");

		// Access the raw arguments
		const rawArgs = command.parent.rawArgs;

		const index = rawArgs.indexOf("--");

		if (index !== -1) {
			const shellCommand = rawArgs.slice(index + 1).join(" ");

			// Execute the shell command with the environment variables
			execSync(`sh -c 'export ${envString} && ${shellCommand}'`, {
				stdio: "inherit",
				env: { ...process.env, ...parsedEnv },
			});
		} else {
			console.error("No command provided after --");
		}
	});

program.parse(process.argv);
