import knex from 'knex';
import pg from 'pg';

const knexfile = require('../../knexfile');
const env = process.env.NODE_ENV || 'development';
pg.types.setTypeParser(1082, (value) => new Date(value).toISOString().substr(0, 10));
const configOptions = knexfile[env];

export interface Job {
    id: number; 
    title: string; 
    description: string; 
    expiry_date: string; 
    created_at: string; 
    updated_at: string;
}

export default knex<Job>(configOptions);