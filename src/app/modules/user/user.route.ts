import express from 'express';
import { UserController } from './user.controllers';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
const router = express.Router();

// 
router.post("/signup", validateRequest(UserValidation.userValidationSchema), UserController.userSignUp);


router.post(
    '/signin',
    validateRequest(UserValidation.userloginValidationSchema),
    UserController.loginUser,
);

export const UserRoutes = router;