import React,{Component} from 'react';
import './Cpu.css';
import Bloque from './bloque/Bloque';

class Cpu extends Component{
    state={
        value:"FIFO",
        quantum:5
    };
    changeVal=(event)=>{
        this.setState({value:event.target.value});
        this.props.cambio(event.target.value)
        
    }
    changeQuantum=(event)=>{
        this.setState({quantum:event.target.value})
        this.props.changeQuantum(event)
    }
    render(){
        let quantum=this.state.value=="FIFO"?<input value={5} disabled="true"></input>:<input value={this.state.quantum} onChange={this.changeQuantum}></input>
        let proceso=this.props.proceso ? this.props.proceso:"";
        let procesoEnRunning=[
            <p className="relleno">Nombre: {proceso.nombre}</p>,
            <p className="relleno">Tpo llegada: {proceso.tpo}</p>,
            <p className="relleno">CPU Asignado: {proceso.asignado}</p>,
            <p className="relleno">Envejecimiento: {proceso.envejecimiento}</p>,
            <p className="relleno">CPU Restante: {proceso.restante}</p>,
        ];
        if(this.state.value!="FIFO"){procesoEnRunning.push(<p className="relleno">Quantum restante: {proceso.quantum}</p>)}
        let CPU=[
            <div className="parte1">
                <select onChange={this.changeVal} value={this.state.value}>
                    <option value="FIFO">FIFO</option>
                    <option value="RR">Round Robin</option>
                    <option value="SRT">SRT (apropiativo)</option>
                    <option value="HRRN">HRRN (apropiativo)</option>
                </select>
            </div>,
            <div className="parte2">
                <p>Tam Quantum:</p>
                {quantum}
            </div>
        ];
        return(
            <div className="divCpu">
                <div className="titulo">
                    <p>CPU</p>
                </div>
                <div className="bloques">
                    <Bloque titulo="Scheduling" relleno={procesoEnRunning}/>
                    <Bloque titulo="CPU" relleno={CPU}/>
                </div>
            </div>
        );
    }
};


export default Cpu;