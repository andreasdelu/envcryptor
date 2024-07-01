# EnvCryptor

EnvCryptor is a tool to encrypt and decrypt environment variables. It allows you to securely manage environment variables in your projects by encrypting and decrypting `.env` files.

## Features

- **Encrypt**: Encrypt environment variable files.
- **Decrypt**: Decrypt environment variable files.
- **Edit**: Edit encrypted environment variable files securely.
- **Generate Key**: Generate new encryption keys.
- **Run**: Run commands with decrypted environment variables.

## Installation

Simply install the package using `npm`:

```bash
npm install envcryptor
```

## Usage

### Encrypt

Encrypt an environment variable file:

Using a key as a string:

```bash
envcryptor encrypt <input> <output> -s <encryption_key>
```

Using a key as a `.key` file:

```bash
envcryptor encrypt <input> <output> -f <file>
```

Options:

- `<input>`: Path to the input `.env` file.
- `<output>`: Path to the output encrypted file.
- `-s <encryption_key>`: Encryption key as a string.
- `-f <file>`: Encryption key as a `.key` file.

### Decrypt

Decrypt an encrypted environment variable file:

Using a key as a string:

```bash
envcryptor decrypt <input> <output> -s <encryption_key>
```

Using a key as a `.key` file:

```bash
envcryptor decrypt <input> <output> -f <file>
```

Options:

- `<input>`: Path to the input encrypted file.
- `<output>`: Path to the output `.env` file.
- `-s <encryption_key>`: Encryption key as a string.
- `-f <file>`: Encryption key as a `.key` file.

### Edit

Edit an encrypted environment variable file:

Using a key as a string:

```bash
envcryptor edit <file> -s <encryption_key>
```

Using a key as a `.key` file:

```bash
envcryptor edit <file> -f <file>
```

Options:

- `<file>`: Path to the encrypted `.env` file.
- `-s <encryption_key>`: Encryption key as a string.
- `-f <file>`: Encryption key as a `.key` file.

### Generate Key

Generate a new encryption key:

And save it to a `.key` file:

```bash
envcryptor keygen -o <output>
```

Or output it to the console:

```bash
envcryptor keygen
```

Options:

- `-o <output>`: Path to the output `.key` file.

### Run

Run a command with decrypted environment variables:

Using a key as a string:

```bash
envcryptor run -e <file> -s <encryption_key> <command>
```

Using a key as a `.key` file:

```bash
envcryptor run -e <file> -f <file> <command>
```

Options:

- `-e <file>`: Path to the encoded `.env` file.
- `-f <file>`: Path to the `.key` file.
- `-s <encryption_key>`: Encryption key as a string.
- `<command>`: Command to run with decrypted environment variables.

## Example

Encrypt an environment variable file:

```bash
envcryptor encrypt .env .env.enc -s my_secret_key
```

Decrypt an encrypted environment variable file:

```bash
envcryptor decrypt .env.enc .env -s my_secret_key
```

Edit an encrypted environment variable file:

```bash
envcryptor edit .env.enc -s my_secret_key
```

Generate a new encryption key:

```bash
envcryptor keygen -o .env.key
```

Run a command with decrypted environment variables:

```bash
envcryptor run -e .env.enc -f .env.key node index.js
```

## Contributing

Feel free to submit issues, fork the repository and send pull requests!

## License

This project is licensed under the MIT License.
