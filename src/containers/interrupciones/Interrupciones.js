import React,{Component} from 'react';
import './Interrupciones.css';
import Contador from './ContTiempo/ContTiempo';

class Interrupciones extends Component{
    state={
        valor:"SVC1",
        pagina:"0"
    }
    changeVal=(event)=>{
        this.setState(
            {valor:event.target.value}
        );
    }
    changePagina=(event)=>{
        this.setState({
            pagina:event.target.value
        })
    }
    render(){
        let opciones=this.props.ejecPaginas;
        if(opciones===null){
            opciones=[];
        }
        opciones=opciones.map((pag,key)=>{return(<option value={pag.pag} key={key}>{pag.pag}</option>);})
        return(
            <div className="Conten">
            <Contador tiempo={this.props.tiempo}/>
            <select onChange={this.changePagina} className="paginas">
                {opciones}
            </select>
            <button onClick={()=>this.props.ejecutar(this.state.pagina)}>Ejec</button>
            <p className="inter1">Interrupcion: </p>
            <select className="select2" onChange={this.changeVal} value={this.state.valor}>
                <option value="SVC1">SVC de solicitud de I/O</option>
                <option value="SVC2">SVC de terminación normal</option>
                <option value="SVC3">SVC de solicitud de fecha</option>
                <option value="Error_Porgrama">Error de programa</option>
                <option value="Quantum_Expirado">Externa de quantum expirado</option>
                <option value="I/O">Dispositivo I/O</option>
            </select>
            <button onClick={(valor)=>this.props.btnBloqueo(this.state.valor)}>Ejec</button>
        </div>
        );
    }
};


export default Interrupciones;
