Sure! Here is a sample `README.md` file based on your project:

````markdown
# EnvCryptor

EnvCryptor is a tool to encrypt and decrypt environment variables. It allows you to securely manage environment variables in your projects by encrypting and decrypting `.env` files.

## Features

- **Encrypt**: Encrypt environment variable files.
- **Decrypt**: Decrypt environment variable files.
- **Edit**: Edit encrypted environment variable files securely.
- **Generate Key**: Generate new encryption keys.
- **Run**: Run commands with decrypted environment variables.

## Installation

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/envcryptor.git
cd envcryptor
npm install
```
````

## Usage

### Encrypt

Encrypt an environment variable file:

```bash
npx envcryptor encrypt <input> <output> -s <encryption_key>
```

Options:

- `<input>`: Path to the input `.env` file.
- `<output>`: Path to the output encrypted file.
- `-s <encryption_key>`: Encryption key as a string.
- `-f <file>`: Encryption key as a `.key` file.

### Decrypt

Decrypt an environment variable file:

```bash
npx envcryptor decrypt <input> <output> -s <encryption_key>
```

Options:

- `<input>`: Path to the input encrypted file.
- `<output>`: Path to the output `.env` file.
- `-s <encryption_key>`: Encryption key as a string.
- `-f <file>`: Encryption key as a `.key` file.

### Edit

Edit an encrypted environment variable file:

```bash
npx envcryptor edit <file> -s <encryption_key>
```

Options:

- `<file>`: Path to the encrypted `.env` file.
- `-s <encryption_key>`: Encryption key as a string.
- `-f <file>`: Encryption key as a `.key` file.

### Generate Key

Generate a new encryption key:

```bash
npx envcryptor keygen -o <output>
```

Options:

- `-o <output>`: Path to the output `.key` file.

### Run

Run a command with decrypted environment variables:

```bash
npx envcryptor run -e <file> -s <encryption_key> -- <command>
```

Options:

- `-e <file>`: Path to the encoded `.env` file.
- `-f <file>`: Path to the `.key` file.
- `-s <encryption_key>`: Encryption key as a string.
- `<command>`: Command to run with decrypted environment variables.

## Example

Encrypt a `.env` file:

```bash
npx envcryptor keygen -o ./key.key
npx envcryptor encrypt ./path/to/.env ./path/to/.env.enc -f ./key.key
```

Decrypt the `.env` file:

```bash
npx envcryptor decrypt ./path/to/.env.enc ./path/to/.env -f ./key.key
```

Edit the encrypted `.env` file:

```bash
npx envcryptor edit ./path/to/.env.enc -f ./key.key
```

Run a command with decrypted environment variables:

```bash
npx envcryptor run -e ./path/to/.env.enc -f ./key.key -- node ./path/to/script.js
```

## Development

### Build

To build the project, run:

```bash
npm run build
```

### Test

To run the tests, use:

```bash
npm test
```

## Contributing

Feel free to submit issues, fork the repository and send pull requests!

## License

This project is licensed under the MIT License.

```

This `README.md` provides a comprehensive overview of the EnvCryptor project, including installation, usage, examples, and development instructions. Adjust the content as necessary to fit your project's specifics.
```
