import express from 'express'
import { add, getById, index } from '../controllers/product.js';
import { checkAuth } from '../midlewares/auth.js';
import {checkPermissionAdmin,checkPermission} from '../midlewares/permission.js'
const router = express.Router();

router.post('/product-add',checkAuth,checkPermission,add);
router.get('/product-list',checkAuth,checkPermission,index);
router.get('/:id',getById);


export default router;
