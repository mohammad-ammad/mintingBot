import axios from 'axios';
import React, { useEffect, useState } from 'react'
import utils from './utils.json';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
// 0xbDE6301e1177AEAf6B0E6975e5f68e55ec138027
const Mint = () => {
    const [address, setAddress] = useState("");
    const [isOption, setIsOption] = useState(false);
    const [islabel, setIslabel] = useState([]);
    const [Fields, setfields] = useState([]);
    const [contract, setContract] = useState([]);
    const [change, setChange] = useState(false);

    const submitHandler = async () => 
    {
        try {
            setChange(true);
            const {data} = await axios.get(`https://api-rinkeby.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=YourApiKeyToken`);
            console.log(data.result[0]['ABI'])
            let abi = JSON.parse(data.result[0]['ABI']);

            for(let item of abi) {
                console.log(item.name)
                if(item.name == 'mint')
                {
                    setIslabel(item.inputs)
                    for(let fields of item.inputs)
                    {
                        setfields(Fields => [...Fields, fields['name']])
                    }
                }
            }
            
            if(window.ethereum)
            {
                const provider = new ethers.providers.Web3Provider(window.ethereum);

                const signer = provider.getSigner();

                const contract = new ethers.Contract(address, data.result[0]['ABI'], signer);

                console.log(contract)

                setContract(contract)

                setIsOption(true)

                setChange(false)

            }
            else 
            {
                console.log("metamask not installed");
                toast.error("Something went wrong")
                setChange(false)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
            setChange(false)
        }
    }


    const mintHandler = async() => 
    {
        let values = [];

        Fields.map((item) => (
            values.push(document.getElementById(item).value)
        ))

        console.log(values)

        try {
           if(values.length === 1)
           {
            const res = await contract.mint(Number(values[0]));
            res.wait();
           }

           else if(values.length === 2)
           {
            const res = await contract.mint(values[0],Number(values[1]));
            res.wait();
           }
           else if (values.length === 3)
           {
            const res = await contract.mint(Number(values[0]),Number(values[1],Number(values[2])));
            res.wait();
           }

        } catch (error) {
            console.log(error)
            if(error.code == 'UNPREDICTABLE_GAS_LIMIT')
            {
                toast.error("Insufficient Balance")
            }
        }
    }
  
  return (
    <>
   <div className="bx__wrapper">
   <div className='bx_container'>
        <div className='mb-3'>
            <label htmlFor="" class="form-label">Contract Address</label>
            <input type="text" className='form-control' name="" id="" value={address} onChange={(e) => setAddress(e.target.value)}/>
           
            <div className="sub__drop">
                <div>abc</div>
                <div>abc</div>
                <div>abc</div>
            </div>
        </div>
        <div class="d-grid gap-2">
            <button type="button" className='btn btn-primary btn-grad' onClick={submitHandler}>{change ? <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div> : 'Fetch'}</button>
        </div>
        {
            isOption && 
            <div>
                {
                    islabel ? islabel.map((item) =>(
                       <>
                       <div className="mb-3">
                            <label htmlFor="">{item.name} ({item.type})</label> 
                            <input type="text" name="" className='form-control' id={item.name} />
                       </div>
                       </>
                    )) : ''
                }
                <button type="button" className='btn-grad' onClick={mintHandler}>Mint</button>
            </div>
        }
    </div>
   </div>
    </>
  )
}

export default Mint