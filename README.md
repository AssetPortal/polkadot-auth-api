[![CI](https://github.com/AssetPortal/polkadot-auth-api/actions/workflows/ci.yaml/badge.svg)](https://github.com/AssetPortal/polkadot-auth-api/actions/workflows/ci.yaml)[![Stage](https://github.com/AssetPortal/polkadot-auth-api/actions/workflows/stage.yaml/badge.svg)](https://github.com/AssetPortal/polkadot-auth-api/actions/workflows/stage.yaml)[![Production](https://github.com/AssetPortal/polkadot-auth-api/actions/workflows/production.yaml/badge.svg)](https://github.com/AssetPortal/polkadot-auth-api/actions/workflows/production.yaml)

# Polkadot Signature Verification API

## Overview

This API enables the verification of Polkadot signatures and addresses, ensuring the authenticity of signed messages and associated addresses.

---

## Features

- Validate Polkadot signatures.
- Verify the authenticity of Polkadot addresses.

---

## API Endpoints

### **GET /health**

#### Description
Checks if the API server is running.

#### Response
- **200 OK**: Indicates the server is operational.

#### Example Response
```
"ok"
```

### **POST /verify**

#### **Description**
Validates a Polkadot signature against a message and address.

---

#### **Request Body**

| Field       | Type     | Required | Description                                      |
|-------------|----------|----------|--------------------------------------------------|
| `message`   | `string` | Yes      | The original message that was signed.           |
| `address`   | `string` | Yes      | The Polkadot address associated with the signer.|
| `signature` | `string` | Yes      | The signature to be validated.                  |

---

#### **Example Request**
```json
{
  "message": "Hello, Polkadot!",
  "address": "12ABCDEF1234567890",
  "signature": "0x1234567890ABCDEF"
}
```

#### **Responses**

**200 OK: Signature is valid.**

```json
{
  "ok": true,
  "message": "Signature is valid."
}
```

**401 Unauthorized: Signature is invalid.**

```json
{
  "ok": false,
  "message": "Signature is invalid."
}
```

**400 Bad Request: Invalid input data.**

```json
{
  "errors": [
    {
      "msg": "Message is required and must be a string.",
      "param": "message",
      "location": "body"
    }
  ]
}
```
---

## Prerequisites

Before using the API, ensure the following tools are installed:

- Node.js (version 18 or later)
- pnpm

### Setup and Usage
#### Clone the Repository

```bash
git clone https://github.com/AssetPortal/polkadot-auth-api
cd polkadot-auth-api
```

#### Install Dependencies

```bash
pnpm install
```

#### Start the Server

```bash
pnpm dev
```

The server will start at http://localhost:3000.


### Testing

Run Unit Tests

```bash
pnpm test
```

### Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Submit a pull request.
