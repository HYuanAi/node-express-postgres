import express, { Router } from 'express';

const app = express(); 
const port: number = 3000;

const router = Router();

import jobQueries from './queries'

router.post('/', jobQueries.createJob);
router.get('/', jobQueries.getJobs);
router.get('/:id', jobQueries.getJob);
router.post('/:id', jobQueries.updateJob);
router.delete('/:id', jobQueries.deleteJob);

app.use('/jobs', router);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})