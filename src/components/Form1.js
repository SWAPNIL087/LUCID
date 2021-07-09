import React, { createRef, useState } from 'react'

import { useScreenshot } from 'use-react-screenshot'

import html2canvas from 'html2canvas';

import Canvas2Image from 'html2canvas'

import Axios from "axios";

import { FaFileUpload } from 'react-icons/fa';

import Sidebar from './Sidebar'

import { useHistory,Link } from "react-router-dom";

import ClimbingBoxLoader from "react-spinners/PropagateLoader";

import {MdPictureAsPdf} from 'react-icons/md'

import {Document,Page} from 'react-pdf/dist/esm/entry.webpack'

import {GrNext} from 'react-icons/gr'

import {GrPrevious} from 'react-icons/gr'

import {RiCloseCircleFill} from 'react-icons/ri'

import {FcProcess} from 'react-icons/fc'

function Form1(props) {

  const ref = createRef(null)

  const [image, takeScreenshot] = useScreenshot()

  let history = useHistory();

  const [file, setFile] = useState({});

  const [Text,setText] = useState('');

  const [initialurl,seturl] =useState('');

  const [loading,setloading] = useState(true)

  // const totaldata = props.location.state.data
  
  const [totalpages,setpages] = useState(0);

    const [pageno,setpageno] = useState(1);

    const [pdffile,setpdffile] = useState();

    const fileloadSucess = ({numPages})=>{

        setpages(numPages);

    }

    const setPdfFile = (e)=>{

        const file = e.target.files[0];

        const reader = new FileReader();

        reader.addEventListener('load',()=>{

            const result = reader.result;

            setpdffile(file)

        })

        reader.readAsDataURL(file)

        var elements = document.getElementsByClassName("pdfView");

        elements[0].classList.remove('d-none');

        var formDiv = document.getElementsByClassName("mainform");

        formDiv[0].classList.add('d-none');

    }

    const showPrev = (e)=>{

        e.preventDefault();

        if(pageno>1){
            setpageno(pageno-1)
        }

        else{
        setpageno(pageno)
      }

    }

    const showNext = (e)=>{

        e.preventDefault();

        if(pageno<totalpages){

            setpageno(pageno+1)
        }
        else{

        setpageno(pageno)
      
      }
    }

  const send = async(event) => {

    try{

      console.log(file)

      setloading(false)

      console.log("alteast sent")

      const data = new FormData();

      data.append("file", file);

      const data2 = await Axios
      // http://localhost:5000
      .post("/upload", data, {

        headers: {'Content-Type': 'multipart/form-data'}

        }).then((res)=>{ 

            console.log("sucess",res.data);

            setText(res.data)

            history.push({

              pathname: '/imageToText',

              state: { data: res.data }

            })
      }).then(()=>{

        window.location.reload();

      })
      .catch(err => console.log("failed"));

      setloading(true)

    }

    catch (e){

      console.log(e)

    }
  };

  const close = ()=>{

    console.log('close')

    var elements = document.getElementsByClassName("upload_details");

    elements[0].classList.add('d-none');

  }

  const closePDF = ()=>{

    console.log('closepDF button')
  
    var elements = document.getElementsByClassName("pdfView");

    elements[0].classList.add('d-none');

    var formDiv = document.getElementsByClassName("mainform");

    formDiv[0].classList.remove('d-none');

  }

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

  const ProcessImg = ()=>{
    
    console.log('capture img and start processing');

    html2canvas(document.querySelector(".ss"))
         .then(function (canvas) {

            var base64URL = canvas.toDataURL('image/jpeg');

            var file2 = dataURLtoFile(base64URL, 'filename.png');

            console.log(file2);
            
            setFile(file2)

            if(file.name != undefined){

              console.log(file)

              send();

            }

            else{

              window.alert('please retry!')

            }
         });

  }
  

  return (

    <div className='row'>

      { loading ? 

        <div className='col-12'>

          <form action="#" className='text-center mt-5 mainform' encType='multipart/form-data'>
            
            {/* <span className='font-weight-bold text-white close d-none' onClick={close}>X</span> */}

            <div className='row'>

              <div className="flex col-6 mt-3">

                <label  htmlFor="file"><FaFileUpload className='uploadbtn' style={{fontSize:'40px',color:'orange'}}/></label>

                <br/>

                <span className='font-weight-bold text-white'>Upload Img</span>

                <input type="file" hidden id="file" accept="image/*" onChange={event => {

                    const file = event.target.files[0];

                    seturl(URL.createObjectURL(event.target.files[0]));

                    setFile(file);

                    var elements = document.getElementsByClassName("image_details");

                    elements[0].classList.remove('d-none');

                  }}
                />
                
              </div>

              <div className='col-6 mt-1'>

                <div>

                    <input type="file" id='file2' onChange={setPdfFile} accept="application/pdf" style={{'display':'none'}}/>

                    <label htmlFor='file2'>

                        <MdPictureAsPdf className='pdfbtn' style={{fontSize:'55px',color:'orange'}}/>

                    </label>

                    <br/>

                    <span className='font-weight-bold text-white'>Upload PDF</span>
                    
                </div>
              
              </div>

            </div>

          </form>
          
          <div className='image_details d-none'>

            <span className='text-primary text-center preview text-white' data-toggle="modal" data-target="#exampleModalCenter">Preview</span>

            <div className="modal fade" id="exampleModalCenter" tabndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

              <div className="modal-dialog modal-dialog-centered"  role="document">

                <div className="modal-content">

                  <div className="modal-header">

                    <h5 className="modal-title" id="exampleModalLongTitle">Image Preview</h5>

                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">

                      <span aria-hidden="true">&times;</span>

                    </button>

                  </div>

                  <div className="modal-body">

                    <img className="PreviewImage" width="100%" height="100%" src={initialurl} />  

                  </div>

                </div>

              </div>

            </div>

            <div className='w-100 text-center'>

              <button type="button" className="btn btn-warning" style={{fontWeight:'bold'}} onClick={send}>Upload</button>

            </div>

          </div>

          <div className='pdfView text-center d-none'>
          
          

          <span className='font-weight-bold'> Page:{pageno}/{totalpages}</span>

            <button className='btn btn-primary m-3' onClick={showPrev}>

                <GrPrevious/>

            </button>

            <button className='btn btn-primary' onClick={showNext}>

              <GrNext/>

            </button>
            
            <button onClick={ProcessImg} className='btn btn-light m-3'>
              <FcProcess/>
            </button>
            <span className='mr-5 float-right closePDF' onClick={closePDF} style={{fontSize:'30px'}}><RiCloseCircleFill/></span>
            <div className='ss'>
            <Document  className='PDFView mt-3' file={pdffile} onLoadSuccess={fileloadSucess}>

                <Page pageNumber={pageno}></Page>

            </Document>
            </div>
          </div>

        </div>
        
        :

        <div className='loader' style={{opacity:'0.5'}}>

        <ClimbingBoxLoader color={'#16f1cd'} loading={true} size={30} />

        <p className='font-weight-bold text-white mt-5'>Loading...</p>

        </div>

      }

    </div>
  );
}

export default Form1;