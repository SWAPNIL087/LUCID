import React, { useState } from 'react'
import {MdPictureAsPdf} from 'react-icons/md'
import {Document,Page} from 'react-pdf/dist/esm/entry.webpack'

const Pdf = ()=>{

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
    }

    const showPrev = (e)=>{
        e.preventDefault();
        if(pageno>1){
            setpageno(pageno-1)

        }
        else{
        setpageno(pageno)}
    }

    const showNext = (e)=>{
        e.preventDefault();
        if(pageno<totalpages){
            setpageno(pageno+1)

        }
        else{
        setpageno(pageno)}
    }

    return (
        <>
        <div>
            <input type="file" id='file2' onChange={setPdfFile} accept="application/pdf" style={{'display':'none'}}/>
                <label htmlFor='file2'>
                    <MdPictureAsPdf className='pdfbtn' style={{fontSize:'55px',color:'orange'}}/>
                </label>
            
        </div>
        <div className='pdfView text-center'>
            Page:<span>{pageno}/{totalpages}</span>
            <div className='m-3'>
                <button className='btn btn-primary m-3' onClick={showPrev}>
                    Prev
                </button>
                <button className='btn btn-primary' onClick={showNext}>
                    Next
                </button>
            </div>
            <Document className='mt-5' file={pdffile} onLoadSuccess={fileloadSucess}>
                <Page pageNumber={pageno}></Page>
            </Document>
        </div>
        </>
    )
}

export default Pdf