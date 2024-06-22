import express from 'express';
import { UserController } from './user.controllers';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './constant';
const router = express.Router();

// 
router.post("/signup", auth(USER_ROLE.admin), validateRequest(UserValidation.userValidationSchema), UserController.userSignUp);


router.post(
    '/signin',
    validateRequest(UserValidation.userloginValidationSchema),
    UserController.loginUser,
);

export const UserRoutes = router;