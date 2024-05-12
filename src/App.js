import logo from './logo.svg';
import './App.css';
import Table from './Components/Table';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Table />
      </Provider>
    </div>
  );
}

export default App;
