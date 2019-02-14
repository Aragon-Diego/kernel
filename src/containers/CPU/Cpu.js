import React,{Component} from 'react';
import './Cpu.css';
import Bloque from './bloque/Bloque';

class Cpu extends Component{
    state={
        value:"FIFO"
    };
    changeVal=(event)=>{
        this.setState({value:event.target.value});
        this.props.cambio(event.target.value)
    }
    render(){
        let proceso=this.props.proceso ? this.props.proceso:"";
        let procesoEnRunning=[
            <p className="relleno">Nombre: {proceso.nombre}</p>,
            <p className="relleno">Tpo llegada: {proceso.tpo}</p>,
            <p className="relleno">CPU Asignado: {proceso.asignado}</p>,
            <p className="relleno">Envejecimiento: {proceso.envejecimiento}</p>,
            <p className="relleno">CPU Restante: {proceso.restante}</p>,
            <p className="relleno">Quantum restante: {proceso.quantum}</p>
        ];
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
                <input></input>
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