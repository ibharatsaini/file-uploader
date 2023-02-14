import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home/Home';
import Login from './Login/Login';
import Upload from './Upload/Upload';
import Header from './Header/Header';
import MyFiles from './MyFiles/MyFiles';
import { Toaster } from 'react-hot-toast';
function App() {
  return (

          <BrowserRouter>
                  <Header />
                  <Toaster />
                  <Routes>
                          <Route path={`/`} element={<Home />} />
                          <Route path={`/login`} element={<Login />} />
                          <Route path={`/upload`} element={<Upload />} />
                          <Route path={`/my-files`} element={<MyFiles />} />
                  </Routes>
          </BrowserRouter>
  );
}

export default App;

