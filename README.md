# Northcoders News API

## Introduction

Welcome to the Northcoders News API. Below, I provide instructions to get the project running locally.

## Getting Started

### Cloning the Repository

To begin working with this project, clone the repository to your local machine:

``` bash
git clone [URL-of-the-repository]
cd [repository-name]
```

## Environment Setup

For this project, you are required to set up two separate environment files — one for development and the other for testing.

1. Development Environment File:

- Create a file named .env.development in the root directory of the project.
- Add the following line to configure the PostgreSQL database for development:

``` bash
 PGDATABASE=name_of_your_development_database.
```

2. Testing Environment File:

- Create a file named .env.test in the root directory of the project.
- Add the following line to configure the PostgreSQL database for testing:

``` bash
 PGDATABASE=name_of_your_test_database
```