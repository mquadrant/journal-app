import express from 'express';
import {createJournal,getAllUserJournals, getSingleUserJournal, updateJournal, deleteJournal} from '../../controllers/journalsController'


const router = express.Router();

/* POST create Journal. */
router.get('/', createJournal);
/* GET Journals for a user listing. */
router.get('/:userId', getAllUserJournals);
/* GET single Journal. */
router.get('/:userId/:journalId', getSingleUserJournal);
/* PATCH journal updating. */
router.patch('/:userId/:journalId', updateJournal);
/* DELETE deleting a journal by id. */
router.delete('/:userId/:journalId', deleteJournal)

export default router;