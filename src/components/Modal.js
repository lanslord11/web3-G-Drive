import React from 'react'
import {useEffect} from "react";
import "./Modal.css"

function Modal({setModalOpen,contract}) {
    const sharing=async()=>{
        const address = document.querySelector(".address").value;
        await contract.allow(address);
        setModalOpen(false);
    }

    const revoke=async ()=>{
        const address = document.querySelector(".address").value;
        await contract.disallow(address);
        setModalOpen(false);
    }

    useEffect(() => {
      const accessList = async ()=>{
        const addressList = await contract.shareAccess();
        console.log(addressList[0]);
        let select = document.querySelector("#selectNumber");
        const options = addressList;
        for(let i =0;i<options.length;i++){
            let opt = options[i];
            if(!opt[1])continue;
            let e1 = document.createElement("option");
            e1.textContent = opt[0];
            e1.value=opt[0];
            select.appendChild(e1);
        }
      }
      contract && accessList();
      
    }, [contract])
    

  return (
    <div className="modalBackground">
        <div className="modalContainer">
            <div className="title">Share with</div>
             <div className="body">
                <input type="text" className="address" placeholder='Enter Address' />
             </div>
             <form action="" id='myForm'>
                <select name="" id="selectNumber">
                    <option value="">People with acess</option>
                </select>
             </form>
             <div className="footer">
                <button onClick={()=>{setModalOpen(false)}} id='cancelBtn'>Cancel</button>
                <button onClick={()=>sharing()}>Share</button>
                <button onClick={()=>{revoke()}} id='cancelBtn'>Revoke</button>
             </div>
        </div>
    </div>
  )
}

export default Modal