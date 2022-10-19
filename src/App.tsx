import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignIn } from './pages/SignIn/SignIn';
import { SignUp } from './pages/SignUp/SignUp';
import { auth } from './firebase';
import { useAppDispatch } from './redux/store';
import { setIsLoggedIn } from './redux/slices/auth';
import { useSelector } from 'react-redux';
import { selectAuth } from './selectors/selectors';
import { Home } from './pages/Home/Home';
import { Profile } from './pages/Profile/Profile';
import { Header } from './components/Header/Header';
import { Messages } from './pages/Messages/Messages';

function App() {
  const dispatch = useAppDispatch();

  const { isLoggedIn } = useSelector(selectAuth);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setIsLoggedIn(true));
      } else {
        dispatch(setIsLoggedIn(false));
      }
    });
  }, []);

  return (
    <>
      {isLoggedIn && <Header />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/direct/inbox" element={<Messages />} />
      </Routes>
    </>
  );
}

export default App;
