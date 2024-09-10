# What to Wear

## Overview

**What to Wear** is a React application that provides clothing recommendations based on the current weather. The app fetches weather data from a weather API and suggests appropriate clothing items that can be added to a MongoDB database.

This project consists of both a front-end (this repository) and a back-end, which handles the database and API logic. The back-end repository can be found [here](https://github.com/moorek11c/se_project_express.git).

## Features

- Fetches current weather data using a weather API.
- Filters and suggests clothing items suitable for the weather.
- Allows users to add, like, or remove clothing items from the database.
- Manages user authentication for logging in and managing their clothing collection.
- Uses a modal for user interactions, such as login and adding new items.

## Technologies Used

- **React**: For building the front-end user interface.
- **Context API**: For global state management.
- **MongoDB**: For storing user-uploaded clothing items, and storing users who create an account.
- **Node.js** & **Express**: Back-end API logic (see [back-end repo](https://github.com/moorek11c/se_project_express.git)).
