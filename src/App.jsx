import { BrowserRouter, Route, Routes } from 'react-router';
import Profile from './pages/profile';
import Review from './pages/review/index'
import Body from './pages/body';
import './App.css';
import LandingPage from './pages/landingPage';
import HomePage from './pages/homePage';
import { Provider } from 'react-redux';
import Store from './store/store';

function App() {

  return (
    <Provider store={Store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LandingPage />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/review' element={<Review />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App;
