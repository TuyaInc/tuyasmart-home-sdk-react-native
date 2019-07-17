import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const Store = applyMiddleware(thunk)(createStore)(reducers);

export default Store;
