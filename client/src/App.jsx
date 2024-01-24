import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedPage from './component/ProtectedPage';
import Home from './Pages/Home/Home';
import JavaScripts from './Pages/Course/JavaScripts/JavaScripts';
import HTMLs from './Pages/Course/HTMLs/HTMLs';
import CSSs from './Pages/Course/CSSs/CSSs';
import Reacts from './Pages/Course/Reacts/Reacts';
import SearchReult from './Pages/Searchs/SearchReult';
import CreatePost from './admin/CreatePost/CreatePost';
import MySqls from './Pages/Course/MySqls/MySql';
import { useEffect, useState } from 'react';
import Loader from './component/Loader';
import Admin from './admin/Admin';
import { MyProvider } from './component/Mycontext';

function App() {
  const [loading, setLoading] = useState(false);
  const fakeAsyncOperation = async () => {
    // Simulate a delay (you can replace this with your actual loading logic)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false); // Set loading to false when the operation is complete
  };
  useEffect(() => {
    fakeAsyncOperation();
  }, [])
  return (
    <>
      {loading ? (<Loader></Loader>) :
        <MyProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/admin' element={<Admin><CreatePost></CreatePost></Admin>}></Route>
              <Route path='/' element={<ProtectedPage><Home></Home></ProtectedPage>}></Route>
              <Route path='/html/:topics?' element={<ProtectedPage><HTMLs></HTMLs></ProtectedPage>}></Route>
              <Route path='/css/:topics?' element={<ProtectedPage><CSSs></CSSs></ProtectedPage>}></Route>
              <Route path='/javascript/:topics?' element={<ProtectedPage><JavaScripts></JavaScripts></ProtectedPage>}
              ></Route>
              <Route path='/react/:topics?' element={<ProtectedPage><Reacts></Reacts></ProtectedPage>}
              ></Route>
              <Route path='/mysql/:topics?' element={<ProtectedPage><MySqls></MySqls></ProtectedPage>}
              ></Route>

              <Route path='/searchResult' element={<ProtectedPage><SearchReult></SearchReult></ProtectedPage>}
              ></Route>
            </Routes>
          </BrowserRouter>
        </MyProvider>
      }
    </>
  )
}

export default App
