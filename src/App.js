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
import { useDispatch, useSelector } from 'react-redux'
import {fetchCollections} from '../src/store/collectionSlice'
import axios from 'axios';
import NoActive from './components/NoActive';
import Footer from './components/Footer';
import Banner from './components/Banner';
function App() {
  const dispatch = useDispatch();

  const {isActive} = useSelector(state => state.connectReducer);

  useEffect(() => {
    dispatch(fetchCollections())
  }, [])

  

  return (
    <>
    <ToastContainer />
    <Navbar/>
    {
      isActive == true ?
     <>
      <Collections/>
      <Mint/>
     </>
       : <NoActive/>
    }
    <Banner/>
    <Footer/>
    </>
  );
}

export default App;
