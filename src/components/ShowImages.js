import React, { useState } from "react";
import Axios from "axios";
import { useHistory,Link } from "react-router-dom";
import Sidebar from './Sidebar'
function ShowImages(props){
    console.log(props.location.state.data)
    const totaldata = props.location.state.data
    const data = props.location.state.data[2]
    const data2 = props.location.state.data[4]
    const arr=[]
    const arr2=[]
    var len = (Object.keys(data).length)
    for (var i=1;i<=len;i++){
        arr.push(data[i])
    }
    console.log(arr)

    var len = (Object.keys(data2).length)
    for (var i=1;i<=len;i++){
        arr2.push(data2[i])
    }
    console.log(arr2)
    return (
        <>
        <Sidebar data={totaldata}/>
        <div style={{minHeight:'100vh'}} className='row col-10 m-auto p-0 w-100'>
        
            <div className='row gallery p-0 m-0 w-100'>
                <div className='col-lg-6 col-md-6 col-12 mt-4 p-0'>
                    <h3 className='text-center'>Original Images</h3>
                    <div className='row p-0 m-0'>
                        <div className='text-center mt-5 col-12'>
                            {arr.map((item,i) =>  <img className='item m-3' key={i} src={require(`../cropped_images/${item}`).default} /> )}
                        </div>
                    </div>
                </div>
                <div className='col-lg-6 col-md-6 col-12 mt-4 p-0' >
                    <h3 className='text-center rainbow-text'>Color-Processed Images</h3>
                    <div className='row w-100 col-12 p-0 m-0'>
                        <div className='text-center mt-5 col-12'>
                            {arr2.map((item,i) =>  <img className='item m-3' key={i} src={require(`../coloredImages/${item}`).default} /> )}
                        </div>
                    </div>
                </div>
            
        </div>
    </div>
    </>
    )
}
export default  ShowImages