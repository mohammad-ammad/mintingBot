import axios from 'axios';
import React, { useEffect, useState } from 'react'
import utils from './utils.json';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { BigFloat32 } from 'bigfloat';

// 0xbDE6301e1177AEAf6B0E6975e5f68e55ec138027
// 0xc1f15B359Deb637324e9198e42E2ebAEdD29cd01
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
    const [priority, setPriority] = useState("");
    const [maxFee, setMaxFee] = useState("");
    const [getValue, setGetValue] = useState(0);
    const [getEstimation, setGetEstimation] = useState(false);
    const [dollar, setDollar] = useState(0);
    const [maxdollar, setMaxDollar] = useState(0);
    const [usd, setusd] = useState(0);
    const [newpriority, setNewPriority] = useState(0);
    const [gasLimit, setgasLimit] = useState(0);
    const [perror, setPerror] = useState("");
    const [merror, setMerror] = useState("");
    const [collectionName, setCollectionName] = useState("");
    const [loader, setLoader] = useState(false);
    const [flag, setFlag] = useState("");
    const [preSaleflag, setPreFlag] = useState(false);
    const [getpreSale, setGetPreSale] = useState(true);
    const [permission, setPermission] = useState(false);

    const collective = useSelector(state => state.collectiveReducer);
    const {account} = useSelector(state => state.connectReducer);

    useEffect(() => {
        const limit = async () => 
        {
            try {
                const {data} = await axios.get(`https://api.etherscan.io/api?module=proxy&action=eth_estimateGas&to=${account}&apikey=SUTT68WDXUAYFWXMWXKJH39K122D6FWYVJ`);
                console.log(data) 
                const resp = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD,EUR');
                let rate = resp.data['USD'];
                setusd(rate);
                if(getEstimation == true)
                {
                    setPriority('1.5')
                    setMaxFee('1.5')
                    let a = Number(toExpo(1.5 * 154277));
                    a = a/1e9;
                    a = a*usd;
                    setDollar(a.toFixed(2))
                    setMaxDollar(a.toFixed(2))
                    let num = parseInt(data.result,16)
                    if(num != null)
                    {
                        // const resp = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD,EUR');
                        // let rate = resp.data['USD'];
                        // setusd(rate);
                        // rate = 0.000000000000021*rate;
                        // setDollar(rate.toFixed(2))
                    }
                    // setPriority(num);
                    // setMaxFee(num);
                    setgasLimit(num);
                    
                }
                else 
                {
                    setPriority("");
                    setMaxFee("");
                }
            } catch (error) {
                console.log(error)
            }
        }

        limit()
    }, [getEstimation])

    const submitHandler = async () => 
    {
        setFlag("");
        setPreFlag(false)
        setPermission(false)
        try {
            setChange(true);
            const {data} = await axios.get(`https://api-rinkeby.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=YourApiKeyToken`);
            console.log(data['result'][0]['ABI'])

            if(data['result'][0]['ABI'] == "Contract source code not verified")
            {
                setFlag("Not Mintable");
                setChange(false)
                return
            }
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
                
                if(item.name == 'preSale')
                {
                    setPreFlag(true);
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

                const resp = await contract.preSale();
                setGetPreSale(resp);

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

        if(address != "")
        {
            try {
                const {data} = await axios.get(`https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=${address}&format=json&include_orders=false&limit=20&offset=0&order_direction=desc`);
                // console.log()
                setCollectionName(data['assets'][0]['name'])
            } catch (error) {
                console.log(error)
            }
        }
    }


    const mintHandler = async() => 
    {
        setPerror("");
        setMerror("");
        if(priority < 1.5)
        {
            setPerror("Priority fee should be greater than 1.5")
            return
        }
        else if(maxFee < 1.5)
        {
            setMerror("Max fee should be greater than 1.5")
            return
        }
        else if(priority > maxFee)
        {
            setPerror("Priority fee should be Less than Max Fee")
            return
        }
        else if (priority > 3)
        {
            setPerror("Priority fee should be less than 3")
            return
        }
        else if(maxFee > 3)
        {
            setMerror("Max fee should be less than 3")
            return
        }
        let values = [];

        Fields.map((item) => (
            values.push(document.getElementById(item).value)
        ))

        var numbers = /^[0-9]+$/;

        // console.log(values[0])

        let num1, num2, num3;

        if(values.length === 1)
        {
            if(values[0].match(numbers) != null)
            {
                num1 = Number(values[0])
            }
            else 
            {
                num1 = values[0];
            }
        }

        if(values.length === 2)
        {
            if(values[0].match(numbers) != null)
            {
                num1 = Number(values[0])
            }
            else 
            {
                num1 = values[0]
            }

            if(values[1].match(numbers) != null)
            {
                num2 = Number(values[1])
            }
            else 
            {
                num2 = values[1]
            }
        }

        if(values.length === 3)
        {
            if(values[0].match(numbers) != null)
            {
                num1 = Number(values[0])
            }
            else 
            {
                num1 = values[0]
            }

            if(values[1].match(numbers) != null)
            {
                num2 = Number(values[1])
            }
            else 
            {
                num2 = values[1]
            }

            if(values[2].match(numbers) != null)
            {
                num3 = Number(values[2])
            }
            else 
            {
                num3 = values[2]
            }

            
        }

        try {
           if(values.length === 1)
           {
            if(gas == "")
            {
             
                 if(maxFee != "" && priority != "")
                 {
                     setLoader(true);
                     try {
                         const res = await contract.mint(num1,{
                             maxFeePerGas: ethers.utils.parseEther(maxFee).div(1e9),
                             maxPriorityFeePerGas: ethers.utils.parseEther(priority).div(1e9),
                             value: ethers.utils.parseUnits(getValue.toString(), 'wei'),
                             gasLimit: 154277,
                         });
                         res.wait();
                         setLoader(false);
                     } catch (error) {
                         console.log(error)
                         setLoader(false);
                         if(error.code == 4001)
                         {
                             
                         }
                         // toast.error("Gas limit")
                     }
                 }
                 else if(priority != "" && maxFee == "")
                 {
                     setLoader(true);
                     try {
                         const res = await contract.mint(num1,{
                             maxPriorityFeePerGas: ethers.utils.parseEther(priority).div(1e9),
                             value: ethers.utils.parseUnits(getValue.toString(), 'wei'),
                             gasLimit: 154277,
                         });
                         res.wait();
                         setLoader(false);
                     } catch (error) {
                         console.log(error)
                         setLoader(false);
                     }
                 }
                 else if(maxFee != "" && priority == "")
                 {
                     setLoader(true);
                     try {
                         const res = await contract.mint(num1,{
                             maxFeePerGas: ethers.utils.parseEther(maxFee).div(1e9),
                             value: ethers.utils.parseUnits(getValue.toString(), 'wei'),
                             gasLimit: 154277,
                         });
                         res.wait();
                         setLoader(false);
                     } catch (error) {
                         console.log(error)
                         setLoader(true);
                     }
                 }
                else 
                {
                 setLoader(true);
                 try {
                     const res = await contract.mint(num1);
                     res.wait();
                     setLoader(false);
                 } catch (error) {
                     console.log(error)
                     setLoader(false);
                 }
                }
            }
            else 
            {
             if(priority != "" && maxFee != "" && gas != "")
             {
                 setLoader(true);
                 try {
                     const res = await contract.mint(num1,{
                         gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
                     });
                     res.wait();
                     setLoader(false);
                 } catch (error) {
                     console.log(error)
                     setLoader(false);
                 }
             }
             else 
             {
                 setLoader(true);
                     try {
                         const res = await contract.mint(num1,{
                             gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
                         });
                         res.wait();
                         setLoader(false);
                     } catch (error) {
                         console.log(error)
                         setLoader(false);
                     }
             }
      
            }
           }

           else if(values.length === 2)
           {
               /* global BigInt */
               if(gas == "")
               {
                
                    if(maxFee != "" && priority != "")
                    {
                        setLoader(true);
                        try {
                            const res = await contract.mint(num1,num2,{
                                maxFeePerGas: ethers.utils.parseEther(maxFee).div(1e9),
                                maxPriorityFeePerGas: ethers.utils.parseEther(priority).div(1e9),
                                value: ethers.utils.parseUnits(getValue.toString(), 'wei'),
                                gasLimit: 154277,
                            });
                            res.wait();
                            setLoader(false);
                        } catch (error) {
                            console.log(error.code)
                            setLoader(false);
                            if(error.code == 4001)
                            {
                                
                            }
                            // toast.error("Gas limit")
                        }
                    }
                    else if(priority != "" && maxFee == "")
                    {
                        setLoader(true);
                        try {
                            const res = await contract.mint(num1,num2,{
                                maxPriorityFeePerGas: ethers.utils.parseEther(priority).div(1e9),
                                value: ethers.utils.parseUnits(getValue.toString(), 'wei'),
                                gasLimit: 154277,
                            });
                            res.wait();
                            setLoader(false);
                        } catch (error) {
                            console.log(error)
                            setLoader(false);
                        }
                    }
                    else if(maxFee != "" && priority == "")
                    {
                        setLoader(true);
                        try {
                            const res = await contract.mint(num1,num2,{
                                maxFeePerGas: ethers.utils.parseEther(maxFee).div(1e9),
                                value: ethers.utils.parseUnits(getValue.toString(), 'wei'),
                                gasLimit: 154277,
                            });
                            res.wait();
                            setLoader(false);
                        } catch (error) {
                            console.log(error)
                            setLoader(true);
                        }
                    }
                   else 
                   {
                    setLoader(true);
                    try {
                        const res = await contract.mint(num1,num2);
                        res.wait();
                        setLoader(false);
                    } catch (error) {
                        console.log(error)
                        setLoader(false);
                    }
                   }
               }
               else 
               {
                if(priority != "" && maxFee != "" && gas != "")
                {
                    setLoader(true);
                    try {
                        const res = await contract.mint(num1,num2,{
                            gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
                        });
                        res.wait();
                        setLoader(false);
                    } catch (error) {
                        console.log(error)
                        setLoader(false);
                    }
                }
                else 
                {
                    setLoader(true);
                        try {
                            const res = await contract.mint(num1,num2,{
                                gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
                            });
                            res.wait();
                            setLoader(false);
                        } catch (error) {
                            console.log(error)
                            setLoader(false);
                        }
                }
         
               }
           }
           else if (values.length === 3)
           {
            if(gas == "")
            {
             
                 if(maxFee != "" && priority != "")
                 {
                     setLoader(true);
                     try {
                         const res = await contract.mint(num1,num2,num3,{
                             maxFeePerGas: ethers.utils.parseEther(maxFee).div(1e9),
                             maxPriorityFeePerGas: ethers.utils.parseEther(priority).div(1e9),
                             value: ethers.utils.parseUnits(getValue.toString(), 'wei'),
                             gasLimit: 154277,
                         });
                         res.wait();
                         setLoader(false);
                     } catch (error) {
                         console.log(error.code)
                         setLoader(false);
                         if(error.code == 4001)
                         {
                             
                         }
                         // toast.error("Gas limit")
                     }
                 }
                 else if(priority != "" && maxFee == "")
                 {
                     setLoader(true);
                     try {
                         const res = await contract.mint(num1,num2,num3,{
                             maxPriorityFeePerGas: ethers.utils.parseEther(priority).div(1e9),
                             value: ethers.utils.parseUnits(getValue.toString(), 'wei'),
                             gasLimit: 154277,
                         });
                         res.wait();
                         setLoader(false);
                     } catch (error) {
                         console.log(error)
                         setLoader(false);
                     }
                 }
                 else if(maxFee != "" && priority == "")
                 {
                     setLoader(true);
                     try {
                         const res = await contract.mint(num1,num2,num3,{
                             maxFeePerGas: ethers.utils.parseEther(maxFee).div(1e9),
                             value: ethers.utils.parseUnits(getValue.toString(), 'wei'),
                             gasLimit: 154277,
                         });
                         res.wait();
                         setLoader(false);
                     } catch (error) {
                         console.log(error)
                         setLoader(true);
                     }
                 }
                else 
                {
                 setLoader(true);
                 try {
                     const res = await contract.mint(num1,num2,num3);
                     res.wait();
                     setLoader(false);
                 } catch (error) {
                     console.log(error)
                     setLoader(false);
                 }
                }
            }
            else 
            {
             if(priority != "" && maxFee != "" && gas != "")
             {
                 setLoader(true);
                 try {
                     const res = await contract.mint(num1,num2,num3,{
                         gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
                     });
                     res.wait();
                     setLoader(false);
                 } catch (error) {
                     console.log(error)
                     setLoader(false);
                 }
             }
             else 
             {
                 setLoader(true);
                     try {
                         const res = await contract.mint(num1,num2,num3,{
                             gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
                         });
                         res.wait();
                         setLoader(false);
                     } catch (error) {
                         console.log(error)
                         setLoader(false);
                     }
             }
      
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

    const MaxHandler = (e) => 
    {
        setPriority(e.target.value)
        let a = Number(toExpo(e.target.value * 154277));
        a = a/1e9;
        a = a*usd;
        setDollar(a.toFixed(2))
        
    }

    const MaxFeeHandler = (e) => 
    {
        setMaxFee(e.target.value);
        let a = Number(toExpo(e.target.value * 154277));
        a = a/1e9;
        a = a*usd;
        setMaxDollar(a.toFixed(2))
    }

    function toExpo(x) {
        if (Math.abs(x) < 1.0) {
          var e = parseInt(x.toString().split('e-')[1]);
          if (e) {
              x *= Math.pow(10,e-1);
              x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
          }
        } else {
          var e = parseInt(x.toString().split('+')[1]);
          if (e > 20) {
              e -= 20;
              x /= Math.pow(10,e);
              x += (new Array(e+1)).join('0');
          }
        }
        return x;
      }

    
  
  return (
    <>
   <div className="bx__wrapper">
   <div className='bx_container'>
        <div className='mb-3'>
            <label htmlFor="" class="form-label">Contract Address: {address ? <a href={`https://rinkeby.etherscan.io/address/${address}`} target='_blank' className='text-white'>{address}</a> : ''}</label>
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
</div> : 'Search'}</button>
{permission == true ? <p className='text-white'>Access denied</p> : ''}
{collectionName ?<div className='text-white d-flex justify-content-between'><p>Collection Name:</p> <p>{collectionName}</p> </div> : ''}
{flag ? <div className='text-white d-flex justify-content-between'><p>Flag:</p><p>{flag}</p></div> : ''}
{
    preSaleflag == true ? <div className='text-white d-flex justify-content-between'> <p>PreSale:</p> <p>{getpreSale == true ? 'ON' : 'OFF'}</p> </div>: ''
}
<div className='d-flex justify-content-start align-items-center text-white'>
    <input type="checkbox" name="" id="" className='me-2' onChange={() => setGetEstimation(!getEstimation)}/>
    Get Estimation
</div>
        </div>
        
        {
            isOption && 
            <div className='row'>
                <div className="col-md-12">
                <div className='mb-3 d-flex justify-content-between align-items-center'>
                         <div>
                         <label htmlFor="">_value (eth)</label>
                         </div>
                        <div>
                        <input type="text" name="" id=""  className='form-control tx_input' value={getValue} onChange={(e)=>setGetValue(e.target.value)} required/>
                        </div>
        </div>
                </div>
                <div className="col-md-12">
                {
                    islabel ? islabel.map((item) =>(
                       <>
                       <div className="mb-3 d-flex justify-content-between align-items-center">
                        {item.name == '_to'
                        ? 
                        <div>
                            <input type="hidden" name="" className='form-control tx_input' value={account} id={item.name} />
                        </div>
                        :
                        <>
                        <div>
                            <label htmlFor="">{item.name} ({item.type})</label> 
                            </div>
                            <div>
                            <input type="text" name="" className='form-control tx_input' placeholder={`${item.name} : ${item.type}`} id={item.name} />
                        </div>
                        </>
                        }
                            
                       </div>
                       </>
                    ))
                    
                     : ''
                }
                </div>
            </div>
        }
         
                    <div className='mt-3 mb-3 d-flex justify-content-between align-items-center'>
                        <div>
                            <label htmlFor="">Priority Fee (gwei) <br/> ({dollar} usd)</label>
                        </div>
                        <div>
                            <input type="text" name="" id="" placeholder='priority Fee : gwei'  className='form-control tx_input' value={priority} onChange={(e)=>MaxHandler(e)} />
                            <p className='text-danger error'>{perror ? perror : ''}</p>
                        </div>
                    </div>
                    <div className='mb-3 d-flex justify-content-between align-items-center'>
                         <div>
                            <label htmlFor="">Max Fee (gwei) <br/> ({maxdollar} usd)</label>
                         </div>
                        <div>
                            <input type="text" name="" id="" placeholder='max Fee : gwei'  className='form-control tx_input' value={maxFee} onChange={(e)=>MaxFeeHandler(e)} />
                            <p className='text-danger error'>{merror ? merror : ''}</p>
                        </div>
                    </div>
                    <div className='mb-3 d-flex justify-content-between align-items-center'>
                         <div>
                         <label htmlFor="">Gas Fee (Optional)</label>
                         </div>
                        <div>
                        <input type="text" name="" id="" placeholder='gas Fee : unit'  className='form-control tx_input' value={gas} onChange={(e)=>setGas(e.target.value)}/>
                        </div>
        </div>
                    <div className='d-flex justify-content-center'>
                    <button type="button" className='btn-grad mint_btn' onClick={mintHandler}>{loader == true ? <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div> : 'Mint'}</button>
                    </div>
    </div>
   </div>
    </>
  )
}

export default Mint