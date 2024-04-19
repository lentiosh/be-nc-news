# Northcoders News API

## Introduction

Welcome to the Northcoders News API. A backend API project to provide news articles, users comments and more.  

## Hosted App

You can access a link to the hosted version of this API at [Hosted Link](https://be-nc-news-c2a5.onrender.com/api/users).

## Project Summary

The Northcoders News API is a real-world backend API service with users, articles and comments. It manages and stores articles, users comments, allowing users to interact with article voting and comment and article posting. Built with Node.js, Express.js and PostgreSQL. The API supports multiple endpoints.

## The minimum versions of Node.js and Postgres 

- Node.js (v14 or later)
- PostgreSQL (v12 or later)

## Getting Started

### Cloning the Repository

To begin working with this project, clone the repository to your local machine:

``` bash
git clone [URL-of-the-repository](https://github.com/lentiosh/be-nc-news)
cd be-nc-news
```

## Environment Setup

For this project, you are required to set up two separate environment files — one for development and the other for testing.

Development Environment File:

- Create a file named .env.development in the root directory of the project.
- Add the following line to configure the PostgreSQL database for development:

``` bash
 PGDATABASE=name_of_your_development_database.
```

Testing Environment File:

- Create a file named .env.test in the root directory of the project.
- Add the following line to configure the PostgreSQL database for testing:

``` bash
 PGDATABASE=name_of_your_test_database
```

## Installing Dependencies
  
Install the necessary Node.js dependencies:

``` bash
npm install
```

Seeding the Database
  
- To seed the local database for development:

``` bash
npm run seed
```

Running Tests
  
- To run automated tests:

``` bash
npm test
``` 