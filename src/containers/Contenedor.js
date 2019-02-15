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
            nombre:0,
            tpo:"",
            asignado:"",
            envejecimiento:"",
            restante:"",
            quantum:"",
            ejecTotal: "",
            pag:"",
            hrrn:"",
        },
        tiempoActual:0,
        schedule:"FIFO",
        quantum:5,
        arreglo:"",
        numeroProcesoActual:1,
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
        this.setState({procesoN:{...this.state.procesoN,pag: pagina}
        });
    };
    changeQuantumHandler=(event)=>{
        let quantum=event.target.value;
        let listaActualizada=[]
        for(let i=0;i<this.state.listo.length;i++){
            let proceso=this.state.listo[i];
            if(i===0){
                proceso.quantum=Math.abs(this.state.quantum-quantum);
            }
            proceso.quantum=quantum;
            listaActualizada.push(proceso);
        }
        this.setState({
            quantum:quantum,
            listo:listaActualizada
        });
    }
    changeEjecTotalHandler=async(event)=>{
        let ejecTotal = event.target.value;
        console.log("ejecTotal " + ejecTotal)
        let procesoN={...this.state.procesoN};
        procesoN.ejecTotal=ejecTotal;
        await this.setState({
            procesoN:procesoN
        });
    };
    llenarProcesoN=async ()=>{
        let tiempoA=this.state.tiempoActual;
        await this.setState({
             procesoN:{...this.setState.procesoN,
                tpo: tiempoA,
                asignado: 0,
                envejecimiento: 0,
                restante: this.state.procesoN.ejecTotal,
                quantum: this.state.quantum,
                hrrn:1 ,
                ejecTotal:this.state.procesoN.ejecTotal,
                pag:this.state.procesoN.pag
            },
        })
        
    }
    addProcesoHandler=async()=>{
        await this.llenarProcesoN()
        console.log("llega aqui")
        await this.ejecutarHandler()
        console.log("llega aqui2")
        let arreglo=[...this.state.listo];
        let numeroProcesoActualMasUno =this.state.numeroProcesoActual;
        await this.changeNameHandler(numeroProcesoActualMasUno);
        numeroProcesoActualMasUno = this.state.numeroProcesoActual + 1;
        arreglo.push(this.state.procesoN);
        console.log(arreglo);
        this.setState({
            listo:arreglo,
            numeroProcesoActual:numeroProcesoActualMasUno,
        })
    };
    sortByKey=(array, key)=>{
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    sortByKey2=(array, key)=>{
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
        return ((x > y) ? 1 : ((x < y) ? -1 : 0));
        });
    }
    ejecutarHandler=async ()=>{
        let listo=[...this.state.listo];
        if (this.state.schedule== "SRT") {
            listo=this.sortByKey2(listo,'restante');
        }if(this.state.schedule=="HRRN"){
            for(let i=0;i<listo.length;i++){
                let proceso = {...listo[i]};
                proceso.hrrn = ((parseInt(proceso.envejecimiento) + parseInt(proceso.ejecTotal)) / parseInt(proceso.ejecTotal));
                listo[i]=proceso;
            }
            listo=this.sortByKey(listo,'hrrn').reverse();
            console.log(listo)
        }
        await this.setState({
            listo:listo
        })
        let tiempoA = this.state.tiempoActual + 1;
        let listaActualizada = [];
        for (let i = 0; i < this.state.listo.length; i++) {
            let proceso = this.state.listo[i];
            if (i === 0) {
                proceso.asignado += 1;
                proceso.restante -= 1;
            } else {
                proceso.envejecimiento += 1;
            }
            if (proceso.restante != 0) {
                listaActualizada.push(proceso);
            } else {
                this.setState({
                    finalizada: [...this.state.finalizada, proceso]
                })
            }
        }
        await this.setState({
            tiempoActual: tiempoA,
            listo: listaActualizada,
        });
        if(tiempoA%5==0){
            this.bloqueadoAListo()
        }
        //this.quantumManager()
    };
    bloqueadoAListo=()=>{
        let bloqueados = [...this.state.bloqueado];
        let listos =[...this.state.listo];
        if(bloqueados.length!==0){
            let proceso=this.state.bloqueado[0];
            bloqueados.reverse();
            bloqueados.pop();
            bloqueados.reverse();
            listos.push(proceso);
            this.setState({
                listo:listos,
                bloqueado:bloqueados
            })
        }
    }
    quantumManager = () => {
        if (this.state.schedule !== "FIFO") {
            let proceso=this.state.listo[0];
            let listo=[...this.state.listo]
            proceso.quantum-=1;
            if(proceso.quantum===0){
               listo.reverse()
               let pop=listo.pop()
               listo.reverse()
               listo.push(pop)
            }
            this.setState({
                listo:listo
            })
        }
    }
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
    changeScheduleHandler=(value)=>{
        console.log(value);
        this.setState({
            schedule:value
        })
    }
    
    render(){
        return(
            <div>
                <div className="Contenedor">
                    <header>My little SO</header>
                    <Inter tiempo={this.state.tiempoActual} ejecutar={this.ejecutarHandler} btnBloqueo={this.BlockHandler}/>
                    <Procesos listo={this.state.listo} corriendo={this.state.listo[0]} bloqueados={this.state.bloqueado} 
                    finalizado={this.state.finalizada} agregar={this.addProcesoHandler}
                    nombre={this.changeNameHandler} pagina={this.changePagHandler} ejecTotal={this.changeEjecTotalHandler} nombreAutomatico={this.state.numeroProcesoActual}/>
                    <Cpu proceso={this.state.listo[0]} cambio={this.changeScheduleHandler} changeQuantum={this.changeQuantumHandler}/>
                    <Memoria/>
                </div>
                <h1>{this.state.arreglo}</h1>
                <input type="file" onChange={this.printTxtHandler}></input>
            </div> 
        );
    }
};
export default Contenedor;