import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedPage from './component/ProtectedPage';
import Home from './Pages/Home/Home';
import JavaScripts from './Pages/Course/JavaScripts/JavaScripts';
import HTMLs from './Pages/Course/HTMLs/HTMLs';
import CSSs from './Pages/Course/CSSs/CSSs';
import Reacts from './Pages/Course/Reacts/Reacts';
import SearchReult from './Pages/Searchs/SearchReult';
import CreatePost from './Pages/CreatePost/CreatePost';
import MySqls from './Pages/Course/MySqls/MySql';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/createPost' element={<CreatePost></CreatePost>}></Route>
          <Route path='/' element={<ProtectedPage><Home></Home></ProtectedPage>}></Route>
          <Route path='/javascripts' element={<ProtectedPage><JavaScripts></JavaScripts></ProtectedPage>}></Route>
          <Route path='/htmls' element={<ProtectedPage><HTMLs></HTMLs></ProtectedPage>}></Route>
          <Route path='/csss' element={<ProtectedPage><CSSs></CSSs></ProtectedPage>}></Route>
          <Route path='/javascripts' element={<ProtectedPage><JavaScripts></JavaScripts></ProtectedPage>}
          ></Route>
          <Route path='/reacts' element={<ProtectedPage><Reacts></Reacts></ProtectedPage>}
          ></Route>
          <Route path='/mysql' element={<ProtectedPage><MySqls></MySqls></ProtectedPage>}
          ></Route>

          <Route path='/searchResult' element={<ProtectedPage><SearchReult></SearchReult></ProtectedPage>}
          ></Route>


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
