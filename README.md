# Argo-Agile-Dashboard

### Overview
Argo is an Agile dashboard built around user experience. This project is focused on making an application that streamlines Agile board processes to allow for easy team organization both from a team member but also a team lead perspective. Each user is provided with their own analytics page that displays their personal metrics for total tasks completed and shows any open tasks. Team leads are also provided with a lead dashboard showing the metrics for the whole team. These measurements of progress are crucial to keeping the team on track and aware of progress. The home page provides an easy to use agile board that allows for drag & drop reorganization and movement for task stages. On the side focused layout there are easily accessible controls to edit and/or delete current tasks which allows for adjustments. All accounts are based on emails which allows for easily manageable teams and project assignments. The design focuses on creating a user-friendly workflow that will integrate with any team. 

### Made by: Aaron Milner & Eurydice Lunnemann 

###  [Video Link](http://example.com)

### Technologies Used
- Vite
- React
- Tailwind
- Lucid
- Dnd
- Express
- Mongoose
- Mongo DB

### Setup and Run Instructions

TODO:put installs and instructions
#### Configuration notes required to run the project
TODO: config setup
#### Test credentials for authenticated users
TODO test credentials

### MVPs
- Editable Agile Board
- Analytics for Team Leads
- User Friendly Story Creation

### API Documentation



| Method  | Path               | Purpose             | request body         | auth requirement | error codes   |
|---------|--------------------|---------------------|----------------------|------------------|---------------|
| POST    | /api/tasks         | create at task      | label, points, phase | none             | 403, 400, 500 |
| POST    | /api/register      | create a user       | email, password      | none             | 400, 500      |
| POST    | /api/login         | authenticate a user | email, password      | none             | 400, 404, 500 |
| POST    | /api/logout        | log a user out      | none                 | member           | 403, 500      |
| GET     | /api/tasks         | get all tasks       | none                 | member           | 403, 500      |
| GET     | /api/user          | get current user    | none                 | member           | 404, 500      |
| GET     | /api/tasks/:id     | get a task by ID    | none                 | member           | 400, 404, 500 |
| PUT     | /api/tasks/:id     | edit a task         | any task fields      | member           | 400, 404, 500 |
| PUT     | /api/users/:id     | edit a user         | email                | member           | 400, 404, 500 |
| DELETE  | /api/tasks/:id     | delete a task       | none                 | member           | 400, 404, 500 |
| DELETE  | /api/users/:id     | delete a user       | none                 | member           | 400, 404, 500 |
