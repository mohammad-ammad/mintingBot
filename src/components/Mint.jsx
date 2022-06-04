import axios from 'axios';
import React, { useEffect, useState } from 'react'
import utils from './utils.json';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
// 0xbDE6301e1177AEAf6B0E6975e5f68e55ec138027
const Mint = () => {
    const [address, setAddress] = useState("");
    const [isOption, setIsOption] = useState(false);
    const [islabel, setIslabel] = useState([]);
    const [Fields, setfields] = useState([]);
    const [contract, setContract] = useState([]);
    const [change, setChange] = useState(false);
    const [onfocus, setOnFocus] = useState(false);
    const [gas, setGas] = useState("");
    const [cat, setCat] = useState([]);

    const collective = useSelector(state => state.collectiveReducer);

    const submitHandler = async () => 
    {
        try {
            setChange(true);
            const {data} = await axios.get(`https://api-rinkeby.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=YourApiKeyToken`);
            console.log(data.result[0]['ABI'])
            let abi = JSON.parse(data.result[0]['ABI']);

            for(let item of abi) {
                setCat(cat => [...cat, item.name])
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
               if(gas=="")
               {
                const res = await contract.mint(Number(values[0]));
                res.wait();
               }
               else 
               {
                const res = await contract.mint(Number(values[0]),{
                    gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
                });
                res.wait();
               }
           }

           else if(values.length === 2)
           {
               if(gas == "")
               {
                    const res = await contract.mint(values[0],Number(values[1]));
                    res.wait();
               }
               else 
               {
                    try {
                        const res = await contract.mint(values[0],Number(values[1]),{
                            gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
                        });
                        res.wait();
                    } catch (error) {
                        toast.error("Gas limit")
                    }

                    // let privatekey = '3db9ae06dca0eaa37d8d219b4d5387342298ccc0465598508129ed25c8a62094';
                    // let wallet = new ethers.Wallet(privatekey);

                    // let transaction = {
                    //     to: values[0],
                    //     value: ethers.utils.parseEther('1'),
                    //     gasLimit: '21000',
                    //     maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'),
                    //     maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'),
                    //     nonce: 1,
                    //     type: 2,
                    //     chainId: 4
                    // };

                    // let rawTransaction = await wallet.signTransaction(transaction).then(ethers.utils.serializeTransaction(transaction));
                    // console.log('Raw txhash string ' + rawTransaction);

                    // let gethProxy = await fetch(`https://api-ropsten.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex=${rawTransaction}&apikey=YourApiKeyToken`);    
                    // let response = await gethProxy.json();    
                        
                    // // print the API response
                    // console.log(response);

                    // console.log(wallet);

               }
           }
           else if (values.length === 3)
           {
               if(gas== "")
               {
                const res = await contract.mint(Number(values[0]),Number(values[1],Number(values[2])));
                res.wait();
               }
               else 
               {
                const res = await contract.mint(Number(values[0]),Number(values[1],Number(values[2])),{
                    gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
                });
                res.wait();
               }
            
           }

        } catch (error) {
            console.log(error)
            if(error.code == 'UNPREDICTABLE_GAS_LIMIT')
            {
                toast.error("Insufficient Balance")
            }
        }
    }

    const onType = () => 
    {
        setOnFocus(true)
    }
  
  return (
    <>
   <div className="bx__wrapper">
   <div className='bx_container'>
        <div className='mb-3'>
            <label htmlFor="" class="form-label">Contract Address</label>
            <input type="text" className='form-control' onClick={onType} name="" id="" value={address} onChange={(e) => setAddress(e.target.value)}/>
           {
               collective.length != 0 && onfocus == true? 
               <div className="sub__drop">
                {
                    collective.map((item) => (
                        <div onClick={()=>setAddress(item)}>{item}</div>
                    ))
                }
              </div>
            : ''
           }


            
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
            <div className='row'>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="">Functions</label>
                        <select name="" id="" className='form-control'>
                            <option value="">Choose Function</option>
                            {
                                cat ? cat.map((item) => (
                                    <option value="">{item}</option>
                                )) : ''
                            }
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                {
                    islabel ? islabel.map((item) =>(
                       <>
                       <div className="mb-3">
                            <label htmlFor="">{item.name} ({item.type})</label> 
                            <input type="text" name="" className='form-control' id={item.name} />
                       </div>
                       </>
                    ))
                     : ''
                }
                {
                    islabel ? 
                    <div className='mb-3'>
                         <label htmlFor="">Gas Fee (Optional)</label>
                        <input type="text" name="" id=""  className='form-control' value={gas} onChange={(e)=>setGas(e.target.value)}/>
                    </div>
                    : ''
                }
                <button type="button" className='btn-grad' onClick={mintHandler}>Pre-Tx</button>
                </div>
            </div>
        }
    </div>
   </div>
    </>
  )
}

export default Mint