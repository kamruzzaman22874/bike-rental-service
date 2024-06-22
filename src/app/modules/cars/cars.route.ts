import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CarValidation } from './cars.validation';
import { CarController } from './cars.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/constant';
const router = express.Router();


router.post(
    '/', auth(USER_ROLE.admin), CarController.createCar
);

router.get('/', CarController.getAllCar)
router.get('/:id', CarController.getCarById)
router.put('/:id', auth(USER_ROLE.admin), CarController.updateCarById);
router.delete('/:id', auth(USER_ROLE.admin), CarController.deleteCarById);

export const CarRoutes = router;
// validateRequest(CarValidation.carValidationSchema),
// USER_ROLE.admin