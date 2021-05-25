import './App.css';
import ChatContainer from './components/ChatArea/ChatContainer';
import Login from './components/ChatAccess/ChatAccess';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  

  return (
    <Router className='App'>
      <Route path='/' exact component={Login} /> 
      <Route path='/chat' exact component={ChatContainer} />
    </Router>
  );
}

export default App;
