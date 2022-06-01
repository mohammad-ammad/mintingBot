import React, { useState } from 'react'
import axios from 'axios';

const Home = () => {
    let collection = [];
    let contract_address = [];
    const startHandler = async () => 
    {
        try {

            const {data} = await axios.get(`https://api.opensea.io/api/v1/collections?format=json&limit=300&offset=0`);
            // console.log(data['collections'][0]['primary_asset_contracts']);
            let counter = 0;

            for(let i=0; i<=data['collections'].length; i++)
            {
                
                 if(data['collections'][i]['primary_asset_contracts'].length != 0)
                 {
                     collection.push(data['collections'][i]['slug']);
                 }

                 counter++;

                 if(counter == data['collections'].length)
                 {
                     loadCollection();
                     break;
                 }
            }


        } catch (err) {
            console.log(err);
        }
    }

    const loadCollection = async () => 
    {
        let counter = 0;
        try {
            console.log("wait...")
            for(let i=0; i<=collection.length; i++)
            {
                // console.log(collection[i])
                const _data = await axios.get(`https://api.opensea.io/api/v1/collection/${collection[i]}?format=json`)
                contract_address.push(_data['data']['collection']['primary_asset_contracts'][0]['address']);
                counter ++;

                if(counter == collection.length)
                {
                    console.log(contract_address);
                    break;
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    
  return (
    <div style={{margin:"20px"}}>
        <button onClick={startHandler}>Start</button>
    </div>
  )
}

export default Home