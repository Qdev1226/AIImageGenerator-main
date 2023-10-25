import { combineReducers } from 'redux';

import authReducer from './authReducer';
import usersReducer from './usersReducer';
import roleReducer from './roleReducer';
import filtersReducer from './filtersReducer';
import salesReducer from './salesReducer';
import categoriesReducer from './categoriesReducer';
import enginesReducer from './enginesReducer';
import modelsReducer from './modelsReducer';
import defaultTokenReducer from './defaultTokenReducer';
import membershipReducer from './membershipReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    roles: roleReducer,
    filters: filtersReducer,
    sales: salesReducer,
    categories: categoriesReducer,
    engines: enginesReducer,
    models: modelsReducer,
    defaultTokenCount: defaultTokenReducer,
    memberships: membershipReducer,
})

export default rootReducer;