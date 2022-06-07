import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollections } from '../store/collectionSlice';
import { add, remove } from '../store/collectiveSlice';
const Collections = () => {

    const dispatch = useDispatch();

    const {data : result, status} = useSelector(state => state.collectionReducer);

    const [show, setShow] = useState(false);

    // useEffect(() => {
    //     const load_data = async () => 
    //     {
    //         dispatch(fetchCollections())
    //     }

    //     load_data();
    // }, [])

    const checkHandler = (check,id) => 
    {
        if(check == true && id == 0)
        {
            dispatch(add(document.getElementById(`ch_${id}`).value))
        }
        else if(check == false && id == 0)
        {
            dispatch(remove(document.getElementById(`ch_${id}`).value))
        }
        else if(check == true && id == 1)
        {
            dispatch(add(document.getElementById(`ch_${id}`).value))
        }
        else if(check == false && id == 1)
        {
            dispatch(remove(document.getElementById(`ch_${id}`).value))
        }
        else if(check == true && id == 2)
        {
            dispatch(add(document.getElementById(`ch_${id}`).value))
        }
        else if(check == false && id == 2)
        {
            dispatch(remove(document.getElementById(`ch_${id}`).value))
        }
        else if(check == true && id == 3)
        {
            dispatch(add(document.getElementById(`ch_${id}`).value))
        }
        else if(check == false && id == 3)
        {
            dispatch(remove(document.getElementById(`ch_${id}`).value))
        }
        else if(check == true && id == 4)
        {
            dispatch(add(document.getElementById(`ch_${id}`).value))
        }
        else if(check == false && id == 4)
        {
            dispatch(remove(document.getElementById(`ch_${id}`).value))
        }
        else if(check == true && id == 5)
        {
            dispatch(add(document.getElementById(`ch_${id}`).value))
        }
        else if(check == false && id == 5)
        {
            dispatch(remove(document.getElementById(`ch_${id}`).value))
        }
        else if(check == true && id == 6)
        {
            dispatch(add(document.getElementById(`ch_${id}`).value))
        }
        else if(check == false && id == 6)
        {
            dispatch(remove(document.getElementById(`ch_${id}`).value))
        }
        else if(check == true && id == 7)
        {
            dispatch(add(document.getElementById(`ch_${id}`).value))
        }
        else if(check == false && id == 7)
        {
            dispatch(remove(document.getElementById(`ch_${id}`).value))
        }
        else if(check == true && id == 8)
        {
            dispatch(add(document.getElementById(`ch_${id}`).value))
        }
        else if(check == false && id == 8)
        {
            dispatch(remove(document.getElementById(`ch_${id}`).value))
        }
        else if(check == true && id == 9)
        {
            dispatch(add(document.getElementById(`ch_${id}`).value))
        }
        else if(check == false && id == 9)
        {
            dispatch(remove(document.getElementById(`ch_${id}`).value))
        }
        
    }

  return (
    <div className="collection_wrapper">
        <div>
            <h1>Latest Collection</h1>
            <div className='show_hide'>
                {
                    show == true ? <button onClick={() => setShow(false)}>Hide Collection</button> : 
                    <button onClick={() => setShow(true)}>Show Collection</button>
                }
            </div>
        </div>
        <div>
            <div className="table-wrapper">
            {show == true &&
                <table class="fl-table">
                    <thead>
                    <tr>
                            <th> Add</th>
                            <th>Address</th>
                            <th>Collection Name</th>
                            <th>Token</th>
                    </tr>
                    </thead>
                    
                    <tbody>
                        {
                             status == 'loading' ? 'Loading' : result ? result.map((item,index) => (
                                <tr key={index}>
                                    <td>
                                        <input type="checkbox" name="" onClick={(e) => checkHandler(e.target.checked,index)}  id={`ch_${index}`} value={item.address} />
                                    </td>
                                    <td>
                                        <a href={`https://rinkeby.etherscan.io/address/${item.address}`} target="_blank">
                                        {item.address}
                                        </a>
                                    </td>
                                    <td>
                                    {item.name}
                                    </td>
                                    <td>
                                    {item.schema_name}
                                    </td>
                                </tr>
                            )) : 'No Collections Found'
                        }
                    </tbody>
                    
                </table>
                }
            </div>
        </div>
    </div>
  )
}

export default Collections