import express from 'express'
import { getAdmin, signin, signup, forgotPassword, resetPassword } from '../controllers/admins/admin.js'
import { getUsers, deleteUser } from '../controllers/admins/users.js'
import { getFilters, addFilter, deleteFilter, updateFilter } from '../controllers/admins/filters.js'
import { getAllModels, getModels, addModel, deleteModel, updateModel } from '../controllers/admins/patterns.js'
import { getAllCategories, getCategories, addCategory, deleteCategory, updateCategory } from '../controllers/admins/categories.js'
import { getAllEngines, getEngines, addEngine, deleteEngine, updateEngine } from '../controllers/admins/engines.js'
import { getFreeTokenCount, updateFreeTokenCount } from '../controllers/admins/freetokens.js'
import { getMemberships, updateMemberships } from '../controllers/admins/memberships.js'

import { getSales, deleteSale } from '../controllers/admins/sales.js'
import { getRoles, updateRole } from '../controllers/admins/roles.js'

import adminAuthMiddleware from '../middleware/admin-auth.js';

const router = express.Router()

router.get('/', adminAuthMiddleware, getAdmin)
router.post('/signin', signin)
router.post('/signup', signup)
router.post('/forgot', forgotPassword);
router.post('/reset', resetPassword);

router.post('/users', getUsers);
router.post('/deleteUser', deleteUser);

router.post('/filters', getFilters);
router.post('/addFilter', addFilter);
router.post('/deleteFilter', deleteFilter);
router.post('/updateFilter', updateFilter);

router.post('/sales', getSales);
router.post('/deleteSale', deleteSale);

router.post('/roles', getRoles);
router.post('/updateRole', updateRole);

router.get('/allCategories', getAllCategories);
router.post('/categories', getCategories);
router.post('/addCategory', addCategory);
router.post('/deleteCategory', deleteCategory);
router.post('/updateCategory', updateCategory);

router.get('/allEngines', getAllEngines);
router.post('/engines', getEngines);
router.post('/addEngine', addEngine);
router.post('/deleteEngine', deleteEngine);
router.post('/updateEngine', updateEngine);

router.get('/allModels', getAllModels);
router.post('/models', getModels);
router.post('/addModel', addModel);
router.post('/deleteModel', deleteModel);
router.post('/updateModel', updateModel);

router.get('/getFreeTokenCount', getFreeTokenCount);
router.post('/updateFreeTokenCount', updateFreeTokenCount);

router.get('/getMemberships', getMemberships);
router.post('/updateMemberships', updateMemberships);


export default router