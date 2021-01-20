# node-express-postgres
CRUD operations for a simple job table. Check out the [user interface](https://github.com/HYuanAi/react-crud) built with ReactJS.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
[http://localhost:3001](http://localhost:3000) to access the APIs.

### `npm run prod`

Builds the app for production to the `build` folder.

## Database connections

Edit knexfile.js in the root directory to specify the database configurations. See [Documentation of Knex](https://knexjs.org/). Then, the following scripts can be run to setup the database:

### `npm run migrate`

Create the necessary 'jobs' table for API use. 

### `npm run unmigrate`

Rollback the action migration.

### `npm run seed`

Seed the database with some predefined instances of jobs. 
