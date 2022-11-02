import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignIn, SignUp, Home, Profile, Messages, Explore, AddPost, EditAccount } from './pages';
import { Header } from './components/Header/Header';
import { People } from './components/People/People';
import { auth } from './firebase';
import { useAppDispatch } from './redux/store';
import { setIsLoggedIn } from './redux/slices/auth';
import { useSelector } from 'react-redux';
import { selectAuth } from './selectors/selectors';

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
        <Route path="/:id" element={<Profile />} />
        <Route path="/direct/inbox" element={<Messages />} />
        <Route path="/explore/people" element={<People />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/new-post" element={<AddPost />} />
        <Route path="/accounts/edit" element={<EditAccount />} />
      </Routes>
    </>
  );
}

export default App;
