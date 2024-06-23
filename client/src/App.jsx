import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect, useState, lazy, Suspense } from 'react';
import Loader from './component/Loader';
import { MyProvider } from './component/MyContext';
import { Skeleton } from 'antd';

const ProtectedPage = lazy(() => import('./component/ProtectedPage'));
const Home = lazy(() => import('./Pages/Home/Home'));
const JavaScripts = lazy(() => import('./Pages/Course/JavaScripts/JavaScripts'));
const HTMLs = lazy(() => import('./Pages/Course/HTMLs/HTMLs'));
const CSSs = lazy(() => import('./Pages/Course/CSSs/CSSs'));
const Reacts = lazy(() => import('./Pages/Course/Reacts/Reacts'));
const SearchReult = lazy(() => import('./Pages/Searchs/SearchReult'));
const CreatePost = lazy(() => import('./admin/pages/CreatePost'));
const MySqls = lazy(() => import('./Pages/Course/MySqls/MySql'));
const Admin = lazy(() => import('./admin/Admin'));
const SearchResultData = lazy(() => import('./Pages/Searchs/SearchResultData'));
const AdminHome = lazy(() => import('./admin/pages/AdminHome'));
const SignUp = lazy(() => import('./admin/Authenticaton/SignUp'));
const Login = lazy(() => import('./admin/Authenticaton/Login'));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fakeAsyncOperation = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };
    fakeAsyncOperation();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <MyProvider>
          <BrowserRouter>
            <Suspense fallback={<Skeleton active />}>
              <Routes>
                <Route path="/" element={<ProtectedPage><Home /></ProtectedPage>} />
                <Route path="/html/:topics?" element={<ProtectedPage><HTMLs /></ProtectedPage>} />
                <Route path="/css/:topics?" element={<ProtectedPage><CSSs /></ProtectedPage>} />
                <Route path="/javascript/:topics?" element={<ProtectedPage><JavaScripts /></ProtectedPage>} />
                <Route path="/react/:topics?" element={<ProtectedPage><Reacts /></ProtectedPage>} />
                <Route path="/mysql/:topics?" element={<ProtectedPage><MySqls /></ProtectedPage>} />
                <Route path="/searchResult" element={<ProtectedPage><SearchReult /></ProtectedPage>} />
                <Route path="/searchResultData/:subject/:topicName" element={<ProtectedPage><SearchResultData /></ProtectedPage>} />
                <Route path="/admin/createPost" element={<Admin><CreatePost /></Admin>} />
                <Route path="/admin" element={<Admin><AdminHome /></Admin>} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<ProtectedPage><Home /></ProtectedPage>} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </MyProvider>
      )}
    </>
  );
}

export default App;
