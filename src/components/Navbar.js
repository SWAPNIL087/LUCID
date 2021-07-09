import React, { useState } from "react";
import logo from './logo.svg'
import {FiSearch} from 'react-icons/fi';
function Navbar() {
  return (
    <div className='row'>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top ">
            <a className="navbar-brand" href="/"><img style={{marginTop:'-7px'}} src={logo}/>UCID</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="#">About <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="#">Contact <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="#">Feedback <span className="sr-only">(current)</span></a>
                </li>
                
                </ul>
            </div>
            {/* <form>
                <input type='text' className="border border-white search"></input>
                <FiSearch className='searchIcon'/>
            </form> */}
        </nav>
        
    </div>
  );
}

export default Navbar;