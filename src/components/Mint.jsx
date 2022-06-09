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
    const [usd, setusd] = useState(0);
    const [newpriority, setNewPriority] = useState(0);
    const [gasLimit, setgasLimit] = useState(0);

    const collective = useSelector(state => state.collectiveReducer);
    const {account} = useSelector(state => state.connectReducer);

    useEffect(() => {
        const limit = async () => 
        {
            try {
                const {data} = await axios.get(`https://api.etherscan.io/api?module=proxy&action=eth_estimateGas&to=${account}&apikey=SUTT68WDXUAYFWXMWXKJH39K122D6FWYVJ`);
                console.log(data) 
                if(getEstimation == true)
                {
                    let num = parseInt(data.result,16)
                    if(num != null)
                    {
                        const resp = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD,EUR');
                        let rate = resp.data['USD'];
                        setusd(rate);
                        rate = 0.000000000000021*rate;
                        setDollar(rate.toFixed(2))
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
                const res = await contract.mint(Number(values[0]),{
                    value: ethers.utils.parseUnits(getValue.toString(), 'wei')
                });
                res.wait();
               }
               else 
               {
                const res = await contract.mint(Number(values[0]),{
                    gasPrice: ethers.utils.parseUnits(gas, 'gwei'),
                    value: ethers.utils.parseUnits(getValue.toString(), 'wei')
                });
                res.wait();
               }
           }

           else if(values.length === 2)
           {
               /* global BigInt */
               if(gas == "")
               {
                
                    if(maxFee != "" && priority != "")
                   {
                    try {
                        const res = await contract.mint(values[0],Number(values[1]),{
                            maxFeePerGas: 1 / 1e9,
                            maxPriorityFeePerGas: 1/ 1e9,
                            value: ethers.utils.parseUnits(getValue.toString(), 'wei'),
                            gasLimit: 21000,
                        });
                        res.wait();
                    } catch (error) {
                        console.log(error)
                        toast.error("Gas limit")
                    }
                    // parseFloat(number).toPrecision(12)
                   }
                   else 
                   {
                    const res = await contract.mint(values[0],Number(values[1]));
                    res.wait();
                   }
               }
               else 
               {
                   if(maxFee != "" && priority != "")
                   {
                    try {
                        const res = await contract.mint(values[0],Number(values[1]),{
                            maxFeePerGas: ethers.utils.parseUnits(maxFee, "gwei"),
                            maxPriorityFeePerGas: ethers.utils.parseUnits(priority, "gwei"),
                            value: ethers.utils.parseUnits(getValue, 'wei')
                            // gasLimit: 2000000,
                        });
                        res.wait();
                    } catch (error) {
                        toast.error("Gas limit")
                    }
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
                   }
                    

                    
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
                    maxFeePerGas: ethers.utils.parseUnits(maxFee, "gwei"),
                    maxPriorityFeePerGas: ethers.utils.parseUnits(priority, "gwei")
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

    const MaxHandler = (e) => 
    {
        setPriority(e.target.value)
        let num = Number(toExpo(usd*(e.target.value/1e9)));
        // setNewPriority(toExpo((e.target.value)/1e9).toString());
        let a = Number(toExpo(e.target.value * 21000));
        a = a/1e9;
        a = a*usd;
        console.log(usd)
        setDollar(a.toFixed(2))
        
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
                         <label htmlFor="">_value</label>
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
                            <div>
                            <label htmlFor="">{item.name} ({item.type})</label> 
                            </div>
                            <div>
                            <input type="text" name="" className='form-control tx_input' id={item.name} />
                            </div>
                       </div>
                       </>
                    ))
                    
                     : ''
                }
                </div>
            </div>
        }
         <div className='mb-3 d-flex justify-content-between align-items-center'>
                         <div>
                         <label htmlFor="">Gas Fee (Optional)</label>
                         </div>
                        <div>
                        <input type="text" name="" id=""  className='form-control tx_input' value={gas} onChange={(e)=>setGas(e.target.value)}/>
                        </div>
        </div>
                    <div className='mb-3 d-flex justify-content-between align-items-center'>
                        <div>
                            <label htmlFor="">Max Priority Fee Per Gas (Optional) <br/> ({dollar} usd)</label>
                        </div>
                        <div>
                            <input type="text" name="" id=""  className='form-control tx_input' value={priority} onChange={(e)=>MaxHandler(e)} />
                        </div>
                    </div>
                    <div className='mb-3 d-flex justify-content-between align-items-center'>
                         <div>
                            <label htmlFor="">Max Fee Per Gas (Optional) <br/> ({dollar} usd)</label>
                         </div>
                        <div>
                            <input type="text" name="" id=""  className='form-control tx_input' value={maxFee} onChange={(e)=>setMaxFee(e.target.value)} />
                        </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                    <button type="button" className='btn-grad' onClick={mintHandler}>Mint</button>
                    </div>
    </div>
   </div>
    </>
  )
}

export default Mint