import './App.css';
import Mint from './components/Mint';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Main from './components/Main';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Collections from './components/Collections';
import { useDispatch } from 'react-redux'
import {fetchCollections} from '../src/store/collectionSlice'
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollections())
  }, [])

  return (
    <>
    <ToastContainer />
    <Navbar/>
    <Collections/>
    <Mint/>
    </>
  );
}

export default App;
