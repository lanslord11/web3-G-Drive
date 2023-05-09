import React from 'react'
import {useState} from 'react';
import "./Display.css"

function Display({contract,account}) {

    const [data,setData] = useState("");
    const getdata=async()=>{
        let dataArray;
        const Otheraddress = document.querySelector(".address").value;
        try {
            if(Otheraddress){
                dataArray=await contract.display(Otheraddress);
                console.log(dataArray);
            }else{
                dataArray=await contract.display(account);
            }
            const isEmpty = Object.keys(dataArray).length===0;
            if(!isEmpty){
            // console.log("dataArray");
            // console.log(dataArray);
            const str=dataArray.toString();
            const str_array=str.split(",");
            console.log(str_array[0].substring(7));
            const images = str_array.map((item,i)=>{
                return(
                    <a href={`https://tomato-electric-impala-477.mypinata.cloud/ipfs/${item.substring(7)}`} key={i} target="_blank" rel="noreferrer">
                        <img src={`https://tomato-electric-impala-477.mypinata.cloud/ipfs/${item.substring(7)}`} alt="new" className='image-list' />
                    </a>
                )
            })
            setData(images);
        }
        } catch (error) {
            alert("You don't have access");
        }
        
        
    }

  return (<>
    <div className="image-list">{data}</div>
    <input type="text" placeholder='EnterAddress' className='address'></input>
    <button className='center button' onClick={getdata}>Get Data</button>
    </>
  )
}

export default Display