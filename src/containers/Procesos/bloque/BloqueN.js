
import React,{Component} from 'react';
import './Bloque.css';

class BloqueN extends Component{
    state={
        valuePag:"",
        valueEjec:""
    }
    changePag=(event)=>{
        let valor=event.target.value;
        if(!isNaN(valor)){
            this.setState({
                valuePag:valor
            })
            this.props.pagina(event)
        }else{
            alert("usa solo números")
        }
    }
    changeEjec=(event)=>{
        let valor=event.target.value;
        if (!isNaN(valor)) {
            this.setState({
                valueEjec:valor
            })
            this.props.ejecTotal(event)
        }else{
           alert("usa solo números")
        }
    }
    clickAgregar=()=>{
        this.setState({
            valuePag:"",
            valueEjec:""
        })
        this.props.agregar();
    }
    render(){
        return(
            <div className="Bloque">
            <header>
                <p>{this.props.titulo}</p>
            </header>
            <section className="Agregar">
                <div className="Dominio">
                    <p>Nombre:</p>
                    <p>Páginas:</p>
                    <p>Ejec total:</p>
                </div>
                <div className="Inputs">
                    <input value={this.props.nombreAuto} disabled="true"></input>
                    <input onChange={this.changePag} value={this.state.valuePag}></input>
                    <input onChange={this.changeEjec} value={this.state.valueEjec}></input>
                </div>
                <button onClick={this.clickAgregar}>Agregar</button>
            </section>
        </div>
        );
    }
};


export default BloqueN;

