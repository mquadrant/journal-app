import express from 'express';
import {createJournal,getAllUserJournals, getSingleUserJournal, updateJournal, deleteJournal} from '../../controllers/journalsController'
import checkAuth from '../../middleware/auth/check-auth';


const router = express.Router();

/* POST create Journal. */
router.post('/',checkAuth, createJournal);
/* GET Journals for a user listing. */
router.get('/',checkAuth, getAllUserJournals);
/* GET single Journal. */
router.get('/:journalId',checkAuth, getSingleUserJournal);
/* PATCH journal updating. */
router.put('/:journalId',checkAuth, updateJournal);
/* DELETE deleting a journal by id. */
router.delete('/:journalId',checkAuth, deleteJournal)

export default router;