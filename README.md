# EnvCryptor

EnvCryptor is a lightweight tool designed to help teams securely share environment variables by encrypting and decrypting `.env` files. This ensures that sensitive information can be managed safely across different environments.

## Features

🔒 **Encrypt**: Securely encrypt environment variable files.<br>
🔓 **Decrypt**: Decrypt environment variable files back to plaintext.<br>
🖋️ **Edit**: Edit encrypted environment variable files securely.<br>
🔑 **Generate Key**: Generate new encryption keys for secure operations.<br>
💨 **Run**: Execute commands with environment variables decrypted on-the-fly.<br>
🪶 **Lightweight**: Minimal dependencies and easy to integrate into any project.<br>

## Installation

You can install the package using `npm`:

```bash
npm install envcryptor
```

Or install it globally:

```bash
npm install -g envcryptor
```

## Usage

### Encrypt

Encrypt an environment variable file using an encryption key:

Using a key as a string:

```bash
npx envcryptor encrypt <input> <output> -s <encryption_key>
```

Using a key from a `.key` file:

```bash
npx envcryptor encrypt <input> <output> -f <key_file>
```

**Options:**

- `<input>`: Path to the input `.env` file.
- `<output>`: Path to the output encrypted file.
- `-s <encryption_key>`: Encryption key as a string.
- `-f <key_file>`: Path to the encryption key file.

### Decrypt

Decrypt an encrypted environment variable file:

Using a key as a string:

```bash
npx envcryptor decrypt <input> <output> -s <encryption_key>
```

Using a key from a `.key` file:

```bash
npx envcryptor decrypt <input> <output> -f <key_file>
```

**Options:**

- `<input>`: Path to the input encrypted file.
- `<output>`: Path to the output decrypted `.env` file.
- `-s <encryption_key>`: Encryption key as a string.
- `-f <key_file>`: Path to the encryption key file.

### Edit

Edit an encrypted environment variable file:

Using a key as a string:

```bash
npx envcryptor edit <file> -s <encryption_key>
```

Using a key from a `.key` file:

```bash
npx envcryptor edit <file> -f <key_file>
```

**Options:**

- `<file>`: Path to the encrypted `.env` file.
- `-s <encryption_key>`: Encryption key as a string.
- `-f <key_file>`: Path to the encryption key file.

### Generate Key

Generate a new encryption key and either save it to a file or output it to the console:

To save to a `.key` file:

```bash
npx envcryptor keygen -o <output>
```

To output to the console:

```bash
npx envcryptor keygen
```

**Options:**

- `-o <output>`: Path to the output `.key` file.

### Run

Run a command with decrypted environment variables:

Using a key as a string:

```bash
npx envcryptor run <file> -s <encryption_key> -- <command>
```

Using a key from a `.key` file:

```bash
npx envcryptor run <file> -f <key_file> -- <command>
```

**Options:**

- `<file>`: Path to the encrypted `.env` file.
- `-f <key_file>`: Path to the encryption key file.
- `-s <encryption_key>`: Encryption key as a string.
- `<command>`: Command to run with decrypted environment variables.

## Examples

### Encrypt an environment variable file:

```bash
npx envcryptor encrypt .env .env.enc -s my_secret_key
```

### Decrypt an encrypted environment variable file:

```bash
npx envcryptor decrypt .env.enc .env -s my_secret_key
```

### Edit an encrypted environment variable file:

```bash
npx envcryptor edit .env.enc -s my_secret_key
```

### Generate a new encryption key:

```bash
npx envcryptor keygen -o .env.key
```

### Run a command with decrypted environment variables:

```bash
npx envcryptor run .env.enc -f .env.key -- node index.js
```

### Load Environment Variables

You can also load environment variables from an encrypted file directly into your application using the `loadEnv` function:

```javascript
import loadEnv from "envcryptor/loadEnv";

loadEnv({
	path: ".env.enc",
	key: "path/to/your/key.key",
});

// Your environment variables are now loaded into process.env
console.log(process.env.YOUR_VARIABLE);
```

## Contributing

We welcome contributions! Feel free to submit issues, fork the repository, and send pull requests.

## License

This project is licensed under the MIT License.

---

This README provides an overview of how to use the EnvCryptor package to manage and securely share environment variables within your team. For more detailed information, refer to the specific function documentation and examples provided in the sections above.
