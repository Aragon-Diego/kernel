import React, { Component } from 'react';
import Contenedor from './containers/Contenedor';

class App extends Component {
  state={
    arreglo:"",
  }
  printTxtHandler=async(event)=>{
    let file = new FileReader();
    let arregloDeTxt;
    file.onload=()=>{
      arregloDeTxt=file.result.split('\n');
      this.setState({
        arreglo: arregloDeTxt,
      });
      console.log(this.state.arreglo)
    };
    file.readAsText(event.target.files[0]);
  };
  render() {
    return (
      <div className="App">
        <Contenedor/>
        <h1>{this.state.arreglo}</h1>
        <input type="file" onChange={this.printTxtHandler}></input>
      </div>
    );
  }
}

export default App;
