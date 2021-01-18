import knex from 'knex';
const knexfile = require('../../knexfile');

const env = process.env.NODE_ENV || 'development';
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