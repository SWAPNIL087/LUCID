import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { SiFacebook } from 'react-icons/si';
import { SiTwitter } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';
const FooterPagePro = () => {
  return (
    <MDBFooter style={{color:'white'}} color="stylish-color-dark" className="page-footer footer font-small pt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <hr className="clearfix w-100 d-md-none" />
          
        </MDBRow>
      </MDBContainer>
      
      <div className="text-center">
        <ul className="list-unstyled list-inline">
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-fb mx-1 socialmedia ">
              <SiFacebook style={{fontSize:'30px'}}/>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-tw mx-1 socialmedia">
            <SiTwitter style={{fontSize:'30px'}}/>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-gplus mx-1 socialmedia">
            <FcGoogle style={{fontSize:'30px'}}/>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-li mx-1 socialmedia">
            <FaLinkedin style={{fontSize:'30px'}}/>
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="#"> Lucid </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPagePro;