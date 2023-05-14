import express from 'express';
import MembershipController from '../controllers/Membership.controller.js';
import protect from '../middlewares/authMiddleware.js';

const membershipRouter = express.Router();

membershipRouter.get('/', protect, MembershipController.getAllMemberships);
membershipRouter.get('/:id', protect, MembershipController.getMembershipById);
membershipRouter.get('/email/:email', protect, MembershipController.getMembershipByEmail);
membershipRouter.get('/search/byemail', protect, MembershipController.searchMembership);
membershipRouter.get('/sort/:type', protect, MembershipController.sortMembership);
membershipRouter.post('/add', protect, MembershipController.createMembership);
membershipRouter.patch('/update/:id', protect, MembershipController.updateMembershipById);
membershipRouter.delete('/delete/:id', protect, MembershipController.deleteMembershipById);


export default membershipRouter;
