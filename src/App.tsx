import { Redirect, Route, Switch } from 'react-router-dom';

import { AuthForm } from './components/AuthForm/AuthForm';
import { Users } from './components/Users/Users';
import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';

import './App.css';
import { BooksPage } from './components/BooksPage/BooksPage';

const App = () => {
  return (
    <div style={{height: '100%'}}>
      <Header />
      <div style={{display: 'flex', height: '100%'}}>
        <div style={{width: '15%'}}>
          <Navbar />
        </div>
        <div style={{width: '85%'}}>
        <Switch>
          <Redirect exact from='/' to='/users' />
          <Route path='/login'
            render={() => <AuthForm />}
          />
          <Route path='/users'
            render={() => <Users />}
          />
          <Route path='/books'
            render={() => <BooksPage />}
          />
        </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
