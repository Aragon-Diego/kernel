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
            paginas:[]
        },
        tiempoActual:0,
        schedule:"FIFO",
        pastSchedule:"",
        quantum:5,
        arreglo:"",
        numeroProcesoActual:1,
        algoritmoMemoria:"FIFO"
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
             procesoN:{...this.state.procesoN,
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
    llenarPaginas=async()=>{
        let num=this.state.procesoN.pag;
        let paginas=[];
        for(let i=0;i<num;i++){
            let pagina={
                pag:i,
                r:"0",
                llegada:"0",
                ultAccs:"0",
                accs:"0",
                lectura:"0",
                escritura:"0",
                contador:0
            };
            paginas.push(pagina)
        }
        await this.setState({
            procesoN:{
                ...this.state.procesoN,
                paginas:paginas
            }
        })
    }
    addProcesoHandler=async()=>{
        await this.llenarProcesoN()
        console.log("llega aqui")
        await this.llenarPaginas()
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
    ejecutarPaginaHandler=async(numero)=>{
        console.log(numero)
        let proceso=this.state.listo[0];
        let paginas=proceso.paginas;
        paginas[numero].ultAccs=this.state.tiempoActual;
        paginas[numero].accs=String(1+parseInt(paginas[numero].accs));
        paginas[numero].lectura="1";
        paginas[numero].contador+=1;
        if(paginas[numero].contador>=5){
            paginas[numero].escritura="1";
        }
        this.state.listo.reverse()
        this.state.listo.pop()
        this.state.listo.reverse()
        await this.setState({
            listo:[proceso,
                ...this.state.listo,
            ]
        })
        this.ejecutarHandler()
        return true;
    }
    ejecutarHandler=async ()=>{
        let listo = [...this.state.listo];
        let pastSchedule = this.state.pastSchedule;
        if (this.state.schedule == "SRT") {
            listo = this.sortByKey(listo, 'restante');
            pastSchedule = "SRT";
        } if (this.state.schedule == "HRRN") {
            for (let i = 0; i < listo.length; i++) {
                let proceso = { ...listo[i] };
                proceso.hrrn = ((parseInt(proceso.envejecimiento) + parseInt(proceso.ejecTotal)) / parseInt(proceso.ejecTotal));
                listo[i] = proceso;
            }
            listo = this.sortByKey(listo, 'hrrn').reverse();
            pastSchedule = "HRRN";
        } else if ((this.state.schedule == "RR" && this.state.pastSchedule !== "RR") || (this.state.schedule == "FIFO" && this.state.pastSchedule !== "FIFO")) {
            listo = this.sortByKey(listo, 'nombre')
            pastSchedule = this.state.schedule;
        }
        await this.setState({
            listo: listo,
            pastSchedule: pastSchedule
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
            console.log("si llega a 5%==0")
            this.bloqueadoAListo()
        }
        this.quantuManager()
    };
    quantuManager=async()=>{
        let listo=[...this.state.listo]
        let proceso={...listo[0]};
        if(this.state.schedule!=="FIFO" && this.state.listo.length!=0){
            proceso.quantum-=1;
            listo[0]=proceso;
            if(proceso.quantum===0){
                proceso.quantum=this.state.quantum;
                listo.reverse();
                listo.pop();
                listo.reverse();
                listo.push(proceso);
                console.log(listo)

            }
            console.log(listo)
            await this.setState({
                listo:listo
            })
        }
        
    }
    reiniciarQuantum=(lista)=>{
        for(let i=0;i<lista.length;i++){
            lista[i].quantum=this.state.quantum;
        }
    }
    bloqueadoAListo=()=>{
        let bloqueados = [...this.state.bloqueado];
        let listos =[...this.state.listo];
        let bul=false;
        if(bloqueados.length!==0){
            let proceso={...bloqueados[0]};
            bloqueados.reverse();
            bloqueados.pop();
            bloqueados.reverse();
            if(listos.length!==0){
                listos.reverse();
                let pop=listos.pop();
                pop.quantum=this.state.quantum;
                proceso.quantum=this.state.quantum;
                listos.reverse();
                console.log("REE");
                listos.push(proceso);
                listos.push(pop);
            }else{
                listos.push(proceso);
            }
            this.reiniciarQuantum(listos);
            this.setState({
                listo:listos,
                bloqueado:bloqueados
            })
            bul=true;
        }
        return bul;
    }
    BlockHandler=async (valor)=>{
        console.log(valor)
        if (valor == "I/O") {
            let bloqueados = [...this.state.bloqueado];
            let listos = [...this.state.listo];
            let bul = false;
            if (bloqueados.length !== 0) {
                let proceso = {
                    ...bloqueados[0]
                };
                bloqueados.reverse();
                bloqueados.pop();
                bloqueados.reverse();
                if(listos.length!==0){
                    listos.reverse();
                    let pop = listos.pop();
                    pop.quantum=this.state.quantum;
                    proceso.quantum=this.state.quantum;
                    listos.reverse();
                    listos.push(proceso);
                    listos.push(pop);
                    console.log(listos);
                }else{
                    listos.push(proceso);
                }
                this.reiniciarQuantum(listos);
                await this.setState({
                    listo: listos,
                    bloqueado: bloqueados
                })
                bul = true;
            }
            if(bul){
              this.ejecutarHandler();
            }
        }
        if(this.state.listo.length!=0){
            this.ejecutarHandler();
            if(valor=="SVC1"){
                let listoQuitado=[...this.state.listo];
                listoQuitado=listoQuitado.reverse();
                let bloqueado=listoQuitado.pop();
                listoQuitado=listoQuitado.reverse();
                let arrBloqueados=[...this.state.bloqueado,bloqueado];
                this.setState({
                    bloqueado:arrBloqueados,
                    listo:listoQuitado
                })
            }else if(valor=="SVC2" || valor=="Error_Porgrama"){
                let listoQuitado = [...this.state.listo];
                listoQuitado = listoQuitado.reverse();
                let finalizado = listoQuitado.pop();
                listoQuitado = listoQuitado.reverse();
                let arrFinalizada = [...this.state.finalizada, finalizado];
                this.setState({
                    finalizada: arrFinalizada,
                    listo: listoQuitado
                })
            }else if(valor=="SVC3"||valor=="Quantum_Expirado"){
                let listoQuitado = [...this.state.listo];
                let pop={...listoQuitado[0]}
                pop.quantum=this.state.quantum;
                listoQuitado.reverse()
                listoQuitado.pop()
                listoQuitado.reverse()
                listoQuitado.push(pop)
                this.setState({
                   listo: listoQuitado
                })
            }
        }else{
            return
        } 
    }
    printTxtHandler = (event) => {
        let file = new FileReader();
        let arregloDeTxt;
        file.onload = async () => {
            arregloDeTxt = file.result.split('\n');
            await this.setState({
                arreglo: arregloDeTxt,
            });
            this.procesarArreglo()
        };
        file.readAsText(event.target.files[0]);
    };
    changeScheduleHandler=(value)=>{
        console.log(value);
        this.setState({
            schedule:value
        })
    }
    procesarArreglo=()=>{
        console.log(this.state.arreglo)
        let arreglo2D=this.state.arreglo.map((i)=>{return(i.split(","))});
        console.log("reee");
        console.log(arreglo2D);
        let tiempoActual=parseInt(arreglo2D[0][1]);
        console.log(tiempoActual);
        let numeroProcesos=parseInt(arreglo2D[1][0]);
        let i=0;
        let arregloProcesos=[];
        while(numeroProcesos!=0){
            let objetoProcesos={
                datos:"",
                paginas:[]
            };
            if(arreglo2D[i].length==3){
                objetoProcesos.datos=arreglo2D[i]
                let numPaginas=arreglo2D[i+1][0];
                console.warn(numPaginas)
                for(let j=0;j<numPaginas;j++){
                    let pagina=arreglo2D[i+2+j]
                    //console.log("pagina:")
                    //console.log(pagina);
                    let objPagina={
                        pag:j,
                        r:String(pagina[0].trim()),
                        llegada:String(pagina[1].trim()),
                        ultAccs:String(pagina[2].trim()),
                        accs:String(pagina[3].trim()),
                        lectura:String(pagina[4].trim()),
                        escritura:String(pagina[5].trim()),
                        contador:0
                    }
                    objetoProcesos.paginas.push(objPagina);
                }
                console.log("objeto de proceso");
                console.log(objetoProcesos);
                arregloProcesos.push(objetoProcesos);
                numeroProcesos--;
            }
            i++;
        }
        console.log(arregloProcesos);
        let listo=[];
        let bloqueado=[]
        let llegadaMaxima=-1;
        for(let i=0;i<arregloProcesos.length;i++){
            let llegada=parseInt(arregloProcesos[i].datos[0]);
            llegadaMaxima=llegada>llegadaMaxima?llegada:llegadaMaxima;
            let ejecTotal=parseInt(arregloProcesos[i].datos[1]);
            if(parseInt(arregloProcesos[i].datos[2])==1){
                let proceso={
                    nombre:llegada,
                    tpo:llegada,
                    asignado:0,
                    envejecimiento:0,
                    restante:ejecTotal,
                    quantum:"",
                    ejecTotal:ejecTotal,
                    pag:"",
                    hrrn:"",
                    paginas:arregloProcesos[i].paginas
                }

                listo.reverse()
                listo.push(proceso)
                listo.reverse()
                console.log("entra a crear")
            }else if (parseInt(arregloProcesos[i].datos[2]) == 2) {
                let proceso={
                    nombre:llegada,
                    tpo:llegada,
                    asignado:0,
                    envejecimiento:0,
                    restante:ejecTotal,
                    quantum:this.state.quantum,
                    ejecTotal:ejecTotal,
                    pag:"",
                    hrrn:"",
                    paginas:arregloProcesos[i].paginas
                }
                bloqueado.push(proceso)
            }else if(parseInt(arregloProcesos[i].datos[2]) == 3){
                let proceso={
                    nombre:llegada,
                    tpo:llegada,
                    asignado:0,
                    envejecimiento:0,
                    restante:ejecTotal,
                    quantum:"",
                    ejecTotal:ejecTotal,
                    pag:"",
                    hrrn:"",
                    paginas:arregloProcesos[i].paginas
                }
                
                listo.push(proceso);
            }
        }
        this.setState({
            tiempoActual:tiempoActual,
            listo:listo,
            bloqueado:bloqueado,
            numeroProcesoActual:llegadaMaxima+1
        })
    }
    resetBitNur=()=>{
        let proceso=this.state.listo[0];
        let paginas=proceso.paginas;
        for(let i=0;i<paginas.length;i++){
            paginas[i].escritura="0";
            paginas[i].lectura="0";
            paginas[i].contador=0;
        }
        this.state.listo.reverse()
        this.state.listo.pop()
        this.state.listo.reverse()
        this.setState({
            listo:[proceso,
                ...this.state.listo,
            ]
        })
        console.log("Si le pica")
        return true;
    }
    render(){
        let paginas=null;
        if (this.state.listo.length!==0){
            paginas=this.state.listo[0].paginas;
        }
        return(
            <div>
                <div className="Contenedor">
                    <header>My little SO</header>
                    <Inter ejecPaginas={paginas} tiempo={this.state.tiempoActual} ejecutar={this.ejecutarPaginaHandler} btnBloqueo={this.BlockHandler}/>
                    <Procesos listo={this.state.listo} corriendo={this.state.listo[0]} bloqueados={this.state.bloqueado} 
                    finalizado={this.state.finalizada} agregar={this.addProcesoHandler}
                    nombre={this.changeNameHandler} pagina={this.changePagHandler} ejecTotal={this.changeEjecTotalHandler} nombreAutomatico={this.state.numeroProcesoActual}/>
                    <Cpu tiempo={this.state.tiempoActual} proceso={this.state.listo[0]} cambio={this.changeScheduleHandler} changeQuantum={this.changeQuantumHandler}/>
                    <Memoria contenido={paginas} click={this.resetBitNur}/>
                </div>
                
                <input type="file" onChange={this.printTxtHandler}></input>
            </div> 
        );
    }
};
export default Contenedor;