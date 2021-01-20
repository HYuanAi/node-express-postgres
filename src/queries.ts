import { RequestHandler, response } from 'express';
import db from './data/db';

const JOB_TABLE_NAME = "job";

// Create Job
const createJob: RequestHandler = async (req, res) => {
    const response = await db(JOB_TABLE_NAME).insert(req.body);
    res.status(201).json(response);
};

// Retrieve jobs by page or by id
const getJobs: RequestHandler = async (req, res) => {
    const page = Object(req.query.page); 
    const pageNumber = page.number || 1; 
    const pageSize = page.size || 5;
    const offset = (pageNumber - 1) * pageSize; 

    const count = await db(JOB_TABLE_NAME).count('id as TOTAL_COUNT');

    const jobs = await db(JOB_TABLE_NAME).offset(offset).limit(pageSize);
    res.status(200).json({
        totalCount: (count[0] as any).TOTAL_COUNT,
        jobs: jobs
    });
};

const getJob: RequestHandler = async (req, res) => {
    const id: number = parseInt(req.params.id);

    const job = await db(JOB_TABLE_NAME).where('id', id).first();
    if (job) res.status(200).json(job);
    else res.sendStatus(404);
};

// Update job by id
const updateJob: RequestHandler = async (req, res) => {
    const id: number = Number(req.params.id);

    const count = await db(JOB_TABLE_NAME).where('id', id).update(req.body);
    console.log(`Updated ${count} row(s)`);
    res.sendStatus(200);
};

// Delete job by id
const deleteJob: RequestHandler = async (req, res) => {
    const id: number = Number(req.params.id);

    const count = await db(JOB_TABLE_NAME).where('id', id).del();
    console.log(`Deleted ${count} row(s)`);
    if (count === 0) res.sendStatus(404);
    else res.sendStatus(200);
};

export default {
    createJob, 
    getJobs, 
    getJob, 
    updateJob, 
    deleteJob
}