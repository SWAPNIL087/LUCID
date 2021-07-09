import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import Form1 from './Form1'
import { useHistory } from "react-router-dom";
import { FiHome,  FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { FaFileUpload } from 'react-icons/fa';
import {BsImages} from 'react-icons/bs'
import {ImBook} from 'react-icons/im'
import {FcIdea} from 'react-icons/fc'
import {GiPowerGenerator} from 'react-icons/gi'
import {GiBookAura} from 'react-icons/gi'
import "react-pro-sidebar/dist/css/styles.css";



const Sidebar = (props) => {
    // console.log(props)
    let history = useHistory();
    const [menuCollapse, setMenuCollapse] = useState(false)
    var act1=false
    var act2=false
    var act3=false
    var act4=false
    var act5=false
    var act6=false
    var act7=false
    var set_num=(props.data[3])
    if(set_num==4){
        act4 = true
    }
    if(set_num==2){
        act2=true
    }
    if(set_num==3){
        act3=true
    }
    if(set_num==5){
        act5=true
    }
    if(set_num==6){
        act6=true
    }
    if(set_num==7){
        act7=true
    }
    const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
    const home = ()=>{
        var x = window.confirm('changes may not be saved')
        if(x==true){
        console.log(x)
        props.data[3] = 1
        history.push({
            pathname: '/',
            state: { data: props.data }
          })
        }
    }
    const summary = ()=>{
        props.data[3] = 2
        history.push({
            pathname: '/imageToText',
            state: { data: props.data }
          })
    }
    const upload = ()=>{
      setMenuCollapse(true)
      var elements = document.getElementsByClassName("upload_details");
      elements[0].classList.remove('d-none');
        // props.data[3] = 3
        // history.push({
        //     pathname: '/form1',
        //     state: { data: props.data }
        //   })
    }
    const images = ()=>{
        console.log(props.arr)
        props.data[3] = 4
        history.push({
            pathname: '/showImages',
            state: { data: props.data }
          })
    }
    const generator = ()=>{
        props.data[3] = 5
        history.push({
            pathname: '/generateImg',
            state: { data: props.data }
          })
    }
    const booksrecom = ()=>{
        props.data[3] = 6
        history.push({
            pathname: '/recommender',
            state: { data: props.data }
          })
    }
    const books= ()=>{
        props.data[3] = 7
        history.push({
            pathname: '/booksapi',
            state: { data: props.data  }
          })
    }
    
    const close = ()=>{

      console.log('close')
  
      var elements = document.getElementsByClassName("upload_details");
  
      elements[0].classList.add('d-none');
  
    }
  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={act1} onClick={home}  icon={<FiHome />}>
                <span className='menuname'>Home</span>
              </MenuItem>
              <MenuItem active={act2} onClick={summary} icon={<FcIdea />}><span className='menuname'>Summary</span></MenuItem>
              <MenuItem active={act3} onClick={upload} icon={<FaFileUpload />}><span className='menuname'>Upload</span></MenuItem>
              <MenuItem active={act4} onClick={images} icon={<BsImages />}><span className='menuname'>Image</span></MenuItem>
              <MenuItem active={act5} onClick={generator} icon={<GiPowerGenerator />}><span className='menuname'>Generate Img</span></MenuItem>
              <MenuItem active={act6} onClick={booksrecom} icon={<GiBookAura />}><span className='menuname'>Recommender</span></MenuItem>
              <MenuItem active={act7} onClick={books} icon={<ImBook />}><span className='menuname'>Books</span></MenuItem>
            </Menu>
          </SidebarContent>
         
        </ProSidebar>
        
      </div>
      <div className='upload_details d-none mt-5'>
          <span className='font-weight-bold text-white close' onClick={close}>X</span>
          <Form1 className='uploadicon'/>
      </div>
                

    </>
  );
};

export default Sidebar;
