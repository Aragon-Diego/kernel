import React,{Component} from 'react';
import "./Contenedor.css";
import Inter from './interrupciones/Interrupciones';
import Procesos from './Procesos/Procesos';
import Cpu from './CPU/Cpu';
import Memoria from './Memoria/Memoria';

class Contenedor extends Component{
    state={
        listo:[],
        bloqueda:[],
        finalizada:[],
        corriendo:[],
        procesoN:{
            nombre:"",
            tpo:"",
            asignado:"",
            envejecimiento:"",
            restante:"",
            quantum:"",
            ejecTotal: "",
            pag:""
        },
        tiempoActual:0,
        schedule:"fifo",
        quantum:null,
    }
    changeNameHandler=(event)=>{
        let nombre=event.target.value;
        this.setState({
            procesoN:{...this.state.procesoN, nombre:nombre}
        });
    }
    changePagHandler=(event)=>{
        let pagina = event.target.value;
        console.log(pagina)
        this.setState({
            procesoN:{...this.state.procesoN,pag: pagina}
        });
    }
    changeEjecTotalHandler=(event)=>{
        let ejecTotal = event.target.value;
        console.log("ejecTotal " + ejecTotal)
        let tiempoA=this.state.tiempoActual;
        this.setState({
            procesoN:{...this.state.procesoN,ejecTotal: ejecTotal,
                tpo:tiempoA,
                asignado:0,
                envejecimiento:0,
                restante: ejecTotal,
                quantum: this.state.quantum
            }
        });
    }
    addProcesoHandler=()=>{
        let arreglo=[...this.state.listo];
        arreglo.push(this.state.procesoN);
        console.log(arreglo);
        this.setState({
            listo:arreglo
        })
    }
    ejecutarHandler=()=>{
        let tiempoA=this.state.tiempoActual+1;
        let listoActualizado = this.state.listo;
        this.setState({
            tiempoActual:tiempoA,
            listo:listoActualizado
        })
    }
    render(){
        return(
            <div className="Contenedor">
                <header>My little SO</header>
                <Inter tiempo={this.state.tiempoActual} ejecutar={this.ejecutarHandler}/>
                <Procesos listo={this.state.listo} corriendo={this.state.corriendo} bloqueados={this.state.bloqueda} 
                finalizado={this.state.finalizada} agregar={this.addProcesoHandler}
                nombre={this.changeNameHandler} pagina={this.changePagHandler} ejecTotal={this.changeEjecTotalHandler}/>
                <Cpu proceso={this.state.listo[0]}/>
                <Memoria/>
            </div>  
        );
    }
};
export default Contenedor;