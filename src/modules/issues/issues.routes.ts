import { Router } from 'express';
import { createIssue, getIssues, getIssueById, updateIssue, deleteIssue } from './issues.controller.js';
import auth from '../../middleware/auth.js';
import { USER_ROLE } from '../../types/AuthRequest.js';

const router = Router();


router.get('/', auth(USER_ROLE.contributor, USER_ROLE.maintainer), getIssues);
router.get('/:id', auth(USER_ROLE.contributor, USER_ROLE.maintainer), getIssueById);

router.post('/', auth(USER_ROLE.contributor, USER_ROLE.maintainer), createIssue);
router.patch('/:id', auth(USER_ROLE.contributor, USER_ROLE.maintainer), updateIssue);
router.delete('/:id', auth(USER_ROLE.maintainer), deleteIssue);

export const IssuesRoutes = router;
