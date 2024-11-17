import express from 'express'
import { add, getById, index } from '../controllers/product.js';
import { checkAuth } from '../midlewares/auth.js';
const router = express.Router();

router.post('/',add);
router.get('/',checkAuth,index);
router.get('/:id',getById);


export default router;
