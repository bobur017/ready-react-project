import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './Login';
import QrPage from './QrPage';
import InsertInfo from './InsertInfo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './Admin';

function App() {

  return (
    <div >

      <Routes>
        {/* <Route path=":id" element={<QrPage />} /> */}
        <Route path="/page" element={<Login />} />
        <Route path="/" element={<Admin />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
