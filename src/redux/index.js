import propTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

let store;

const setStore = (lStore) => {
  if (store) return;
  store = lStore;
};

const dispatch = (action) => {
  if (typeof action === 'function') {
    action(store.dispatch, store.getState);
  } else if (action.type) {
    store.dispatch(action);
  }
};

export const Provider = ({ store, children }) => {
  setStore(store);
  return <>{children}</>;
};

Provider.propTypes = {
  store: propTypes.shape({
    subscribe: propTypes.func,
    unsubscribe: propTypes.func,
    dispatch: propTypes.func,
    getState: propTypes.func,
  }).isRequired,
  children: propTypes.node.isRequired,
};

export const useSelector = (selector) => {
  const prop = useRef(selector(store.getSubscriber()));
  const [state, setState] = useState(prop.current.value);

  useEffect(() => {
    prop.current.subscribe((value) => setState(value));

    return () => prop.current.unsubscribe();
  }, []);

  return state;
};

export const useDispatch = () => dispatch;
