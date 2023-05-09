import React from 'react'
import {useState} from "react";
import axios from"axios";
import "./FileUpload.css";

function FileUpload({contract,account,provider}) {

    const [file,setFile] = useState(null);
    const [fileName,setFileName] = useState("No image selected");
    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(file){
            try{
                const formData = new FormData();
                formData.append("file",file);
                
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                      pinata_api_key: `ad7159a3f96ec9f19bb2`,
                      pinata_secret_api_key: `a4e24845309848f5364f47da7b152e2fcbd7f83f5ef318f697b070c9f1df3cc9`,
                      "Content-Type": "multipart/form-data",
                    },
                  });
                  console.log("lksdfl");
                const ImgHash = `ipfs://${resFile.data.IpfsHash}`
                // const signer = contract.connect(provider.getSigner());
                contract.add(account,ImgHash);
                alert("Successfully Image Uploaded");
                setFileName("No Image Selected");
                setFile(null);
            }catch(e){
                alert("Unable to upload to Pinata")
            }
        }
    }
    const retrieveFile=(e)=>{
        const data = e.target.files[0];
        console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend=()=>{
            setFile(e.target.files[0]);
        }
        setFileName(e.target.files[0].name);
    }

  return (
    <div className='top'>
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="file-upload" className='choose'>
                Choose Image
            </label>
            <input disabled={!account} type="file" id="file-upload" name='data' onChange={retrieveFile}/>
            <span className='textArea'>Image:{fileName}</span>
            <button type="submit" className="upload" disabled={!file}>Upload File</button>
        </form>
    </div>
  )
}

export default FileUpload