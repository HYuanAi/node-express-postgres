import { RequestHandler } from 'express';
import db, { Job } from './data/db';

const JOB_TABLE_NAME = "job";

// Create Job
const createJob: RequestHandler = (req, res) => {
    db(JOB_TABLE_NAME)
        .insert(req.body)
        .then(job => {
            res.status(201).json(job);
        });
};

// Retrieve jobs by page or by id
const getJobs: RequestHandler = (req, res) => {
    const page = Object(req.query.page); 
    const pageNumber = page.number || 1; 
    const pageSize = page.size || 5;
    const offset = (pageNumber - 1) * pageSize; 

    db(JOB_TABLE_NAME)
        .count('id as TOTAL_COUNT')
        .then(count => 
            db(JOB_TABLE_NAME)
                .offset(offset)
                .limit(pageSize)
                .then(jobs => {
                    res.status(200).json({
                        totalCount: (count[0] as any).TOTAL_COUNT, 
                        jobs: jobs
                    });
                })
        );
    
};

const getJob: RequestHandler = (req, res) => {
    const id: number = parseInt(req.params.id);

    db(JOB_TABLE_NAME)
        .where('id', id)
        .first()
        .then(job => {
            if (job) {
                res.status(200).json(job);
            }
            else res.sendStatus(404);
        })
};

// Update job by id
const updateJob: RequestHandler = (req, res) => {
    const id: number = Number(req.params.id);

    db(JOB_TABLE_NAME)
        .where('id', id)
        .update(req.body)
        .then(rows => {
            console.log(rows);
            res.sendStatus(200);
        });
};

// Delete job by id
const deleteJob: RequestHandler = (req, res) => {
    const id: number = Number(req.params.id);
    db(JOB_TABLE_NAME)
        .where('id', id)
        .del()
        .then(count => {
            console.log(`deleted $(count) rows`);
            if (count == 0) res.sendStatus(404);
            else res.sendStatus(200);
        })
};

export default {
    createJob, 
    getJobs, 
    getJob, 
    updateJob, 
    deleteJob
}