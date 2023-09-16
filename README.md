# IT Crowd Challenge - Documentation

## Description
This project is part of the ITC Challenge and is a web application aimed at the commercialization of products, in this case, books.

## Project Structure
The project is structured as follows:

#### frontend: Contains the client code developed in React + Vite.
#### backend: Contains the backend server code developed in Node.js, Express, Postgres, and Sequelize.
#### database: Contains files related to the "books" database.

## Features
Home: Displays the available books in the database.
Detail: Shows the details of a specific book.
Admin: Dashboard to view, create, edit, and delete books from the database. Additionally, you can view loaded publishers, create them, and delete them.

# REST API
The application uses a REST API to manage books and publishers. Below are the available endpoints:

#### GET /api/books: Retrieves a list of all books, with the option to filter by name or description.

#### GET /api/books/{id}: Retrieves the details of a specific book.

#### POST /api/books: Creates a new book.

#### PUT /api/books/{id}: Updates the details of an existing book.

#### DELETE /api/books/{id}: Deletes an existing book.

#### GET /api/editorials: Retrieves a list of all publishers.

#### GET /api/editorials/{id}: Retrieves the details of a specific publisher.

#### POST /api/editorials: Creates a new publisher.

#### DELETE /api/editorials/{id}: Deletes an existing publisher.

## API REST Documentation
### Swagger: 
https://itc-challenge-production.up.railway.app/api-doc/#/

## Instructions for Running the Project Locally
Follow these steps to run the application locally:

## Frontend
Open a terminal and navigate to the frontend directory.
Run npm install to install client dependencies.
Run npm run dev to start the client development server.
## Backend
Open a terminal and navigate to the backend directory.
Run npm install to install server dependencies.
Configure the necessary environment variables (e.g., database connection string).
Run npm start to start the backend server.
The application will be available at https://localhost:5173 for the client and https://localhost:3001 for the backend server.

