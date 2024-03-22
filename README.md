<h1 align="center">Food Explorer API 🍴</h1>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  <img src="https://img.shields.io/github/languages/count/agleymelo/food-explorer-api" alt="Languages">
  <img src="https://img.shields.io/github/repo-size/agleymelo/food-explorer-api" alt="Repo Size">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made%20by-Agley-%2354c1e4" alt="Made by Agley">
  <img src="https://img.shields.io/github/last-commit/agleymelo/food-explorer-api" alt="Last Commit">
</p>

## Overview

Welcome to Food Explorer API, the backbone of a revolutionary digital menu system developed as the final challenge for Rocketseat's program. This API is designed to provide a seamless and exceptional experience for managing restaurant menus and orders.

## Technologies Used 💻

This project leverages the following technologies:

- **Node.js**: A powerful JavaScript runtime environment for building scalable applications.
- **Express**: A fast, minimalist web framework for Node.js, ideal for building robust APIs.
- **SQLite**: A lightweight and self-contained SQL database engine, perfect for development and small-scale applications.
- **Knex**: A SQL query builder for Node.js, providing a flexible and portable way to interact with databases.
- **Multer**: A middleware for handling multipart/form-data, enabling easy file uploads.
- **JWT (JSON Web Tokens)**: A compact, URL-safe means of representing claims to be transferred between two parties, facilitating secure authentication and authorization.

## Objective 🪧

The goal of Food Explorer API is to streamline restaurant operations and enhance customer experience through advanced digital menu management and order handling. Key objectives include:

- **User Management**: Enable users to register, log in, and manage their profiles securely.
- **Interactive Menu**: Provide an intuitive and visually appealing digital menu interface for customers to explore available dishes, view ingredients, and make informed decisions.
- **Order Management**: Facilitate efficient order processing, tracking, and management, ensuring timely delivery and customer satisfaction.

## Getting Started 🚀

### Prerequisites

Before running the project, ensure you have the following installed on your machine:

- **Node.js**: Download and install Node.js from [here](https://nodejs.org/). It's recommended to use the LTS version.
- **Git**: Install Git from [here](https://git-scm.com/) if you haven't already.

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/agleymelo/food-explorer-api.git
```

2. Navigate to the project directory:

```bash
cd food-explorer-api
```

3. Install dependencies using npm or yarn:

```bash
# Using npm
npm install

# Using yarn
yarn
```

## **Configuration** ⚙️

1. Create a .env file in the root directory based on the .env.example file provided.

2. Configure the necessary environment variables such as JWT_SECRET and PORT.

- Create a .env file as shown in the .env.example file at the root of the project and configure the necessary environment variables. For example:

```dotenv
JWT_SECRET="api_url"
PORT=
```

## Running the Serve 🚧

Start the server using the following command:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

The API will be accessible locally at http://localhost:PORT, where "PORT" is the port you specified in the .env file.

## Usage

Once the server is running, you can interact with the API endpoints using tools like Postman or curl. Refer to the API documentation for details on available endpoints and their usage.

## Contribution

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests to help improve this project.

## License

This project is licensed under the MIT License.

<h3 align="center">Made with ❤️ by Agley</h3>
