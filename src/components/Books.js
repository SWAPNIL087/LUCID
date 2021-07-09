import React, { useState } from "react";
import Sidebar from './Sidebar'
import {FiSearch} from 'react-icons/fi'
function Books(props){
    
    
    const [query,setquery] = useState()
    const totaldata = props.location.state.data
    console.log(totaldata)
    const [books,setbooks] = useState(totaldata[6])
    const search = ()=>{
        console.log('search button',{query})
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&download=epub&key=AIzaSyDG67AiOnGLbba_7Oeg2IL6c-eMr24ZnEQ`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setbooks(data.items)
        })
    }
    


    return(
        <div className='min-vh-100 mt-5' >
            <Sidebar data={totaldata}/>
            <div className='col-10 m-auto'>
            <form className='text-center searchbar'>
                <input type='text' onChange={(e)=>setquery(e.target.value)} placeholder='Search Books' className="w-75 border border-black search"></input>
                <FiSearch onClick={search}  className='searchIcon'/>
            </form>
            
            
            
            <div className='gallery'>
            {
                    books.map((item)=>{
                        return (
                            <a  target="_blank" className='text-center text-info' href={item.volumeInfo.previewLink}>
                            <div style={{maxWidth:'250px'}} >
                                <img className='itemB p-1 m-3' key={item.id} src={item.volumeInfo.imageLinks.thumbnail}></img>
                                <div className='position-absolute book_details' >
                                    <p className='text-center '><strong className=''>Title: </strong>{item.volumeInfo.title}</p>
                                    <p className='text-center '><strong>Authors: </strong>{item.volumeInfo.authors}</p>
                                    <p className='text-center '><strong>ratingsCount: </strong>{item.volumeInfo.ratingsCount}</p>
                                   
                                </div>
                            </div>
                            </a>
                            )
                    })
                }
            </div>
            </div>
        </div>
    )
}
export default  Books