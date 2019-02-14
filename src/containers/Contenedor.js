import React,{Component} from 'react';
import "./Contenedor.css";
import Inter from './interrupciones/Interrupciones';
import Procesos from './Procesos/Procesos';
import Cpu from './CPU/Cpu';
import Memoria from './Memoria/Memoria';

class Contenedor extends Component{
    state={
        listo:[],
        bloqueado:[],
        finalizada:[],
        corriendo:[],
        procesoN:{
            nombre:1,
            tpo:"",
            asignado:"",
            envejecimiento:"",
            restante:"",
            quantum:"",
            ejecTotal: "",
            pag:"",
            hrrn:""
        },
        tiempoActual:0,
        schedule:"fifo",
        quantum:null,
        arreglo:"",
        numeroProcesoActual:1
    };
    changeNameHandler=(nombre1)=>{
        let nombre=nombre1;
        this.setState({
            procesoN:{...this.state.procesoN, nombre:nombre}
        });
    };
    changePagHandler=(event)=>{
        let pagina = event.target.value;
        console.log(pagina)
        this.setState({
            procesoN:{...this.state.procesoN,pag: pagina}
        });
    };
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
    };
    addProcesoHandler=()=>{
        let arreglo=[...this.state.listo];
        let numeroProcesoActualMasUno=this.state.numeroProcesoActual+1;
        this.changeNameHandler(numeroProcesoActualMasUno);
        arreglo.push(this.state.procesoN);
        console.log(arreglo);
        this.setState({
            listo:arreglo,
            numeroProcesoActual:numeroProcesoActualMasUno,
        })
    };
    ejecutarHandler=()=>{
        let tiempoA=this.state.tiempoActual+1;
        let listoActualizado = this.state.listo;
        this.setState({
            tiempoActual:tiempoA,
            listo:listoActualizado
        })
    };
    BlockHandler=()=>{
        if(this.state.listo.length!=0){
            let listoQuitado=[...this.state.listo];
            listoQuitado=listoQuitado.reverse();
            let bloqueado=listoQuitado.pop();
            listoQuitado=listoQuitado.reverse();
            let arrBloqueados=[...this.state.bloqueado,bloqueado];
            this.setState({
                bloqueado:arrBloqueados,
                listo:listoQuitado
            })
        }else{
            return
        } 
    }
    printTxtHandler = async (event) => {
        let file = new FileReader();
        let arregloDeTxt;
        file.onload = () => {
            arregloDeTxt = file.result.split('\n');
            this.setState({
                arreglo: arregloDeTxt,
            });
            console.log(this.state.arreglo)
        };
        file.readAsText(event.target.files[0]);
    };
    render(){
        return(
            <div>
            <div className="Contenedor">
                <header>My little SO</header>
                <Inter tiempo={this.state.tiempoActual} ejecutar={this.ejecutarHandler} btnBloqueo={this.BlockHandler}/>
                <Procesos listo={this.state.listo} corriendo={this.state.listo[0]} bloqueados={this.state.bloqueado} 
                finalizado={this.state.finalizada} agregar={this.addProcesoHandler}
                nombre={this.changeNameHandler} pagina={this.changePagHandler} ejecTotal={this.changeEjecTotalHandler} nombreAutomatico={this.state.numeroProcesoActual}/>
                <Cpu proceso={this.state.listo[0]}/>
                <Memoria/>
            </div>
            <h1>{this.state.arreglo}</h1>
            <input type="file" onChange={this.printTxtHandler}></input>
            </div> 
        );
    }
};
export default Contenedor;