# Ticket Management System

This project is a ticket management system consisting of two parts:

1. **Frontend** — located in the `tickets-frontend` folder and built with React.
2. **Backend** — located in the `backend_ruby_on_rails` folder and built with Ruby on Rails. Docker and Docker Compose are used for easy setup and deployment.

## Contents

1. [Requirements](#requirements)
2. [Installation and Launch](#installation-and-launch)
   - [Backend Launch](#backend-launch)
   - [Frontend Launch](#frontend-launch)
3. [Useful Commands](#useful-commands)
4. [Project Structure](#project-structure)

## Requirements

To work with this project, you will need to install the following tools:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (for local frontend development)

## Installation and Launch

### Backend Launch

1. Navigate to the `backend_ruby_on_rails` directory:

   ```sh
   cd backend_ruby_on_rails
   ```

2. Start Docker Compose to build and run all necessary containers:

   ```sh
   docker-compose up --build
   ```

   ```bash
   docker compose run --rm booking_server bash
   rails db:create
   rails db:migrate
   ```

   ```bash
    docker compose run --rm gate_server bash
    rails db:create
    rails db:migrate
   ```

   ```bash
    docker compose run --rm user_server bash
    rails db:create
    rails db:migrate
   ```

   ```bash
   docker compose run --rm ticket_server bash
   rails db:create
   rails db:migrate
   rails db:seed
   ```

3. Once the backend is successfully launched, it will be accessible at `http://localhost:3000`.

### Frontend Launch

1. Navigate to the `tickets-frontend` directory:

   ```sh
   cd tickets-frontend
   ```

2. Install the necessary dependencies:

   ```sh
   npm install
   ```

3. Start the frontend server:

   ```sh
   npm start
   ```

4. Once the frontend is successfully launched, it will be accessible at `http://localhost:3000`.

## Useful Commands

### Backend

- Stop all containers:

  ```sh
  docker-compose down
  ```

- Restart containers:

  ```sh
  docker-compose restart
  ```

- View logs:

  ```sh
  docker-compose logs -f
  ```

### Frontend

- Build the project:

  ```sh
  npm run build
  ```

- Run tests:

  ```sh
  npm test
  ```
