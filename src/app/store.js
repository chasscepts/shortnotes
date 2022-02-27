import configureStore from '../redux/configure-store';
import notesReducer from './reducers/slice';

const store = configureStore({
  notes: notesReducer,
});

export default store;
