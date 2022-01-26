import './App.css';
import Productos from './Productos';
import React, { Component } from 'react';

class App extends Component {
  
  constructor( props ){
    super( props );
    this.state = {

    }
  }

  render(){
    return (
      <div className="App">
        <div className='row'>
          <Productos></Productos>
        </div>
      </div>
    );  
  }

}

export default App;