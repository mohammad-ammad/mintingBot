import './App.css';
import Mint from './components/Mint';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Main from './components/Main';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    localStorage.removeItem("option_1")
    localStorage.removeItem("option_2")
    localStorage.removeItem("option_3")
    localStorage.removeItem("option_4")
    localStorage.removeItem("option_5")
    localStorage.removeItem("option_6")
    localStorage.removeItem("option_7")
    localStorage.removeItem("option_8")
    localStorage.removeItem("option_9")
    localStorage.removeItem("option_10")
  },[])
  return (
    <>
    <ToastContainer />
    <Main/>
    </>
  );
}

export default App;
