// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      user: 'job_crud_user',
      host: 'localhost',
      database: 'job-api',
      password: 'job-crud2021',
      port: 5432
    },
    migrations: { 
      directory: './src/data/migrations'
    },
    seeds: {
      directory: './src/data/seeds'
    }
  },

  testing: {
    client: 'postgresql',
    connection: {
      user: 'job_crud_user',
      host: 'localhost',
      database: 'job-api',
      password: 'job-crud2021',
      port: 5432
    },
    migrations: { 
      directory: './src/data/migrations'
    },
    seeds: {
      directory: './src/data/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      user: 'job_crud_user',
      host: 'localhost',
      database: 'job-api',
      password: 'job-crud2021',
      port: 5432
    }
  },
  migrations: { 
    directory: './src/data/migrations'
  },
  seeds: {
    directory: './src/data/seeds'
  }

};
