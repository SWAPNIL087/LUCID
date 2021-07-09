import './App.css';
import Form1 from './components/Form1'
import Extracted_text from './components/Extracted_text'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ShowImages from './components/ShowImages'
import Unsplash_images from './components/Unsplash_images'
import Books from './components/Books'
import React,{useState,useEffect} from 'react'
import Home from './components/Home'
import Recommender from './components/Recommender'
import Pdfreader from './components/Pdfreader'
function App() {
  
  return (
    <Router>
    <div className="App mt-5">
    <Navbar/>
    
      <div className=''>
      <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/form1' component={Form1}/>
      <Route exact path='/imageToText' component={Extracted_text}/>
      <Route exact path='/showImages' component={ShowImages}/>
      <Route exact path='/generateImg' component={Unsplash_images}/>
      <Route exact path='/booksapi' component={Books}/>
      <Route exact path='/recommender' component={Recommender}/>
      <Route exact path='/Pdf' component={Pdfreader}/>
      </Switch>
      </div>
    <Footer/>
    </div>
    </Router>
  );
}

export default App;

