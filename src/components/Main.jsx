import React, {useEffect} from 'react'
import Collections from './Collections'
import Mint from './Mint'
import Navbar from './Navbar'
import { fetchCollections } from '../store/collectionSlice'
import { useDispatch } from 'react-redux'

const Main = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchCollections())
  // }, [])
  return (
    <>
    {/* <Navbar/>
    <Mint/> */}
    </>
  )
}

export default Main