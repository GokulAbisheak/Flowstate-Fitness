import express from 'express';
import MembershipController from '../controllers/Membership.controller.js';
import protect from '../middlewares/authMiddleware.js';

const membershipRouter = express.Router();

membershipRouter.get('/', MembershipController.getAllMemberships);
membershipRouter.get('/:id', MembershipController.getMembershipById);
membershipRouter.get('/email/:email', MembershipController.getMembershipByEmail);
membershipRouter.post('/add', MembershipController.createMembership);
membershipRouter.patch('/update/:id', MembershipController.updateMembershipById);
membershipRouter.delete('/delete/:id', MembershipController.deleteMembershipById);

export default membershipRouter;
