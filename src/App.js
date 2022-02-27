import { Provider } from './redux';
import store from './app/store';
import Panel from './components/Panel';

const App = () => (
  <Provider store={store}>
    <Panel />
  </Provider>
);

export default App;
