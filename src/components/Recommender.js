import React,{useState} from 'react'
import Sidebar from './Sidebar'
import {FiSearch} from 'react-icons/fi'
import Axios from "axios";
import ClimbingBoxLoader from "react-spinners/PropagateLoader";
const Recommender = (props)=>{
    const [query,setquery] = useState()

    const list_of_books = []

    const totaldata = props.location.state.data
    
    // const[org_books,setorg] = useState()
    const [books,setbooks] = useState(totaldata[6])
    
    const [loading,setloading] = useState(true)

    const search = async(event) => {
        event.preventDefault();
        try{
          setloading(false)
          const data = await Axios
          // http://localhost:5000
          .post("/booksRec", {query}, {
            headers: {'Content-Type': 'application/json'}
            })
        .then((res)=> {
            setbooks(res.data[0])
            console.log('asdcasdcascasdc',res.data)
            var elements = document.getElementsByClassName("temporary");
            elements[0].classList.add('d-none');
            
            }).then(()=>{
                console.log(list_of_books)
                
            })
            
        .catch(err => console.log(err));
            setloading(true)
        }
        catch (err){
          console.log(err)
        }
    }

    return(
        <>
        <div className='min-vh-100 mt-5'>
        <Sidebar data={totaldata}/>
        {loading ? 
        <div className='text-center'>
        <div className='col-10 m-auto'>
            <form className='text-center searchbar'>
                <input type='text' onChange={(e)=>setquery(e.target.value)} placeholder='Enter a BookName' className="w-75 border border-black search"></input>
                <FiSearch onClick={search} className='searchIcon'/>
            </form>
            <div>
            </div>

            {/* <div className="gallery temporary">
                {
                    org_books.map((item)=>{
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
            </div> */}



            <div className="gallery">
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
        :
        <div className='loader text-center'>
        <ClimbingBoxLoader color={'#16f1cd'} loading={true} size={30} />
            <p className='font-weight-bold text-white mt-5 mr-5'>Loading...</p>
        </div>
        }
        </div>
        </>
    )
}
export default Recommender