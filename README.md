# Interview Scheduler

## Summary
The scheduler app is a SPA built with create-react-app. It utilizes a PostgreSQL database for data persistence. A user may Create, Edit, and Delete appointments for any given day, Monday to Friday. 

Tests were conducted throughout development using Jest. End-to-end testing was conducted with Cypress.

This project was completed as a part of the LighthouseLabs Web Development program.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server
This will run on localhost:8000 by default. This project is intended to be run along side the LHL scheduler-api project (https://github.com/Dmartinez-van/scheduler-api).

To run the Scheduler React Program:
```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Project Learnings
- React
- Axios
- Storybook, Webpack Dev Server, Jest, Testing Library, Cypress

## Potential for Additional Learning
- Webpack, Babel
- WebSockets

## ScreenShots
Example of weekday List of appointments
![Example of weekday List of appointments](https://github.com/Dmartinez-van/scheduler/blob/master/docs/Appointments_Monday.png)

Example of Editing existing appointment
![Example of Editing existing appointment](https://github.com/Dmartinez-van/scheduler/blob/master/docs/Appointments_Monday_edit.png)

Example of Deleting existing appointment
![Example of Deleting existing appointment](https://github.com/Dmartinez-van/scheduler/blob/master/docs/Appointments_Monday_delete.png)