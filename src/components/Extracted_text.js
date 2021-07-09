import React, { useState } from "react";
import Axios from "axios";
import { useHistory,Link } from "react-router-dom";
import Sidebar from './Sidebar'
function Extracted_text(props) {
    let history = useHistory();
    console.log(props,"henlui")
    console.log(window.location.origin)
    const totaldata = props.location.state.data
    console.log(totaldata)
    const imglist = props.location.state.data[2]
    var arr = [];
    for (var key in imglist) {
        arr.push(imglist[key]);
    }
    console.log(arr)
    
  return (
      <>
    <Sidebar data={totaldata}/>
    <div className='row col-10 m-auto min-vh-100'>
        <div className="text-center m-2">
            <div className='row w-100'>
                <div className='col-lg-6  col-md-12 col-12 mt-4 summary-box'>
                    <h3>Extracted Text</h3>
                    <div className='text-left'>
                        <p >{props.location.state.data[1]}</p>
                    </div>
                </div>
                <div className='col-lg-6  col-md-12 col-12 mt-4  summary-box'>
                    <h3 className='rainbow-text'>Summary Of Text</h3>
                    <div className='text-left'>
                        <p >{props.location.state.data[0]}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default Extracted_text;