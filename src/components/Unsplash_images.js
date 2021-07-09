import React, { useState } from "react";
import Sidebar from './Sidebar'
import {FiSearch} from 'react-icons/fi'
function Unsplash_images(props){
    const totaldata = props.location.state.data
    const gen_img = totaldata[5]
    const [query,setquery] = useState()
    const [images,setimages] = useState(gen_img)
    //console.log(props.location.state.data)
    const [imgs,setimgs] = useState([])
    
    console.log('gen_imfg',gen_img)
    var data = totaldata[5] 
    var len = (Object.keys(data).length)
    const arr=[]
    for (var i=0;i<len;i++){
        arr.push(data[i])
    }
    

    const search = ()=>{
        var elements = document.getElementsByClassName("loading");
        elements[0].classList.add('d-none');

        console.log('search button clicked ',{query})
        var q = {query}
        fetch(`https://api.unsplash.com/search/photos?client_id=WzNR3R-goULj23PenoM2_UKE5szysXpMO9Q-Lmq0Ct0&query=${query}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setimgs(data.results)
        })
    }
    return ( 
        <div className='min-vh-100 mt-5'>
        <Sidebar data={totaldata}/>
            <div className='col-10 m-auto'>
            <form className='text-center searchbar'>
                <input type='text' onChange={(e)=>setquery(e.target.value)} placeholder='Search Images' className="w-75 border border-black search"></input>
                <FiSearch onClick={search} className='searchIcon'/>
            </form>
            
            <div className="gallery loading">
                {
                    images.map((item)=>{
                        return (
                            <div>
                            <img className='item p-1 m-3' key={item[0]} src={item[0]}></img>
                            <p className='text-center text-info text-capitalize font-weight-bold'>{item[1]}</p>
                            </div>
                            )
                    })
                }
            </div>
            <div className='gallery'>
            {
                    imgs.map((item)=>{
                        return (
                            <div>
                            <img className='item2 p-1 m-3' key={item.id} src={item.urls.regular}></img>
                            </div>
                            )
                    })
                }
            </div>
            </div>
        </div>
    )
}
export default  Unsplash_images