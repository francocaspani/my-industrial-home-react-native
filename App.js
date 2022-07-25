import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './store';
import Router from './src/components/Router';

export const urlBackend = 'https://my-industrial-home-back.herokuapp.com/api'

export default function App() {
  return (
    <Provider store={store}>
        <Router />
    </Provider>
  );
}
