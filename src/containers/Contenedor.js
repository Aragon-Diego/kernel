import React,{Component} from 'react';
import "./Contenedor.css";
import Inter from './interrupciones/Interrupciones';
import Procesos from './Procesos/Procesos';
import Cpu from './CPU/Cpu';
import Memoria from './Memoria/Memoria';

class Contenedor extends Component{
    state={
        listo:[""],
        bloqueda:[""],
        finalizada:[""],
        corriendo:[""],
        procesoN:{
            nombre:"",
            tpo:"",
            asignado:"",
            envejecimiento:"",
            restante:"",
            quantum:"",
            ejecTotal:"",
            pag:""
        },
        tiempoActual:0,
        schedule:"fifo",
        quantum:null,
    }
    changeNameHandler=(event)=>{
        let nombre=event;
        this.setState({
            procesoN:{nombre:nombre}
        });
    }
    changePagHandler=(event)=>{
        let pagina = event;
        this.setState({
            procesoN:{pag: pagina}
        });
    }
    changeEjecTotalHandler=(event)=>{
        let ejecTotal = event;
        this.setState({
            procesoN:{ejecTotal: ejecTotal},
            procesoN:{tpo:this.state.tiempoActual},
            procesoN:{asignado:0},
            procesoN:{envejecimiento:0},
            procesoN:{restante: ejecTotal},
            procesoN:{quantum: this.state.quantum}
        });
    }
    
    render(){
        return(
            <div className="Contenedor">
                <header>My little SO</header>
                <Inter tiempo={this.state.tiempoActual}/>
                <Procesos listo={this.state.listo} corriendo={this.state.corriendo} bloqueados={this.state.bloqueda} finalizado={this.state.finalizada}/>
                <Cpu proceso={this.state.corriendo}/>
                <Memoria/>
            </div>  
        );
    }
};
export default Contenedor;