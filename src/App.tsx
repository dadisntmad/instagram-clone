import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Messages, Explore, AddPost, EditAccount } from './pages';
import { Header, People } from './components';
import { auth } from './firebase';
import { useAppDispatch } from './redux/store';
import { setIsLoggedIn } from './redux/slices/auth';
import { useSelector } from 'react-redux';
import { selectAuth } from './selectors/selectors';

const SignUp = lazy(() => import('./pages/SignUp/SignUp'));
const SignIn = lazy(() => import('./pages/SignIn/SignIn'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const NotFound = lazy(() => import('./components/NotFound/NotFound'));

function App() {
  const dispatch = useAppDispatch();

  const { isLoggedIn } = useSelector(selectAuth);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setIsLoggedIn(true));
      } else {
        dispatch(setIsLoggedIn(false));
      }
    });

    return () => unsub();
  }, []);

  return (
    <>
      {isLoggedIn && <Header />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/:id" element={<Profile />} />
          <Route path="/direct/inbox" element={<Messages />} />
          <Route path="/explore/people" element={<People />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/new-post" element={<AddPost />} />
          <Route path="/accounts/edit" element={<EditAccount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
