import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Collections = () => {

    const [result, setResult] = useState([]);
    const [change, setChange] = useState(false);

    useEffect(() => {
        const load_data = async () => 
        {
            setChange(true);
            const {data} = await axios.get(`https://testnets-api.opensea.io/api/v1/collections?format=json&limit=10&offset=0`);

            setTimeout(myTimer, 5000)
            
            function myTimer()
            {
                setResult(data.collections);
                // console.log(result.length)
            }
            
            setChange(false);
            
        }

        load_data();
    }, [])

    const checkHandler = (check,id) => 
    {
        if(check == true && id == 0)
        {
            localStorage.setItem("option_0",document.getElementById(`ch_${id}`).value)
        }
        else if(check == false && id == 0)
        {
            localStorage.removeItem("option_0")
        }
        else if(check == true && id == 1)
        {
            localStorage.setItem("option_1",document.getElementById(`ch_${id}`).value)
        }
        else if(check == false && id == 1)
        {
            localStorage.removeItem("option_1")
        }
        else if(check == true && id == 2)
        {
            localStorage.setItem("option_2",document.getElementById(`ch_${id}`).value)
        }
        else if(check == false && id == 2)
        {
            localStorage.removeItem("option_2")
        }
        else if(check == true && id == 3)
        {
            localStorage.setItem("option_3",document.getElementById(`ch_${id}`).value)
        }
        else if(check == false && id == 3)
        {
            localStorage.removeItem("option_3")
        }
        else if(check == true && id == 4)
        {
            localStorage.setItem("option_4",document.getElementById(`ch_${id}`).value)
        }
        else if(check == false && id == 4)
        {
            localStorage.removeItem("option_4")
        }
        else if(check == true && id == 5)
        {
            localStorage.setItem("option_5",document.getElementById(`ch_${id}`).value)
        }
        else if(check == false && id == 5)
        {
            localStorage.removeItem("option_5")
        }
        else if(check == true && id == 6)
        {
            localStorage.setItem("option_6",document.getElementById(`ch_${id}`).value)
        }
        else if(check == false && id == 6)
        {
            localStorage.removeItem("option_6")
        }
        else if(check == true && id == 7)
        {
            localStorage.setItem("option_7",document.getElementById(`ch_${id}`).value)
        }
        else if(check == false && id == 7)
        {
            localStorage.removeItem("option_7")
        }
        else if(check == true && id == 8)
        {
            localStorage.setItem("option_8",document.getElementById(`ch_${id}`).value)
        }
        else if(check == false && id == 8)
        {
            localStorage.removeItem("option_8")
        }
        else if(check == true && id == 9)
        {
            localStorage.setItem("option_9",document.getElementById(`ch_${id}`).value)
        }
        else if(check == false && id == 9)
        {
            localStorage.removeItem("option_9")
        }
        
    }

  return (
    <div className="collection_wrapper">
        <div>
            <h1>Latest Collection</h1>
        </div>
        <div>
            <div className="table-wrapper">
                <table class="fl-table">
                    <thead>
                    <tr>
                            <th>Add</th>
                            <th>Address</th>
                            <th>Collection Name</th>
                            <th>Token</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            console.log(result)
                        }
                        {
                            change == true ? 'Loading' : result.length > 0 ? result.map((item,index) => (
                                <tr key={index}>
                                    <td>
                                        <input type="checkbox" name="" onClick={(e) => checkHandler(e.target.checked,index)}  id={`ch_${index}`} value={item.primary_asset_contracts[0]['address']} />
                                    </td>
                                    <td>
                                        <a href={`https://rinkeby.etherscan.io/address/${item.primary_asset_contracts[0]['address']}`} target="_blank">
                                        {item.primary_asset_contracts[0]['address']}
                                        </a>
                                    </td>
                                    <td>
                                    {item.primary_asset_contracts[0]['name']}
                                    </td>
                                    <td>
                                    {item.primary_asset_contracts[0]['schema_name']}
                                    </td>
                                </tr>
                            )) : 'No Collections Found'
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Collections