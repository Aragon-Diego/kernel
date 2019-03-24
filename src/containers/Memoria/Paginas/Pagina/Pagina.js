import React from 'react';

const Pagina=(props)=>{
    let arregloMemoria=[props.pag,props.r,props.llegada,
        props.ultAccs,props.accs];
    arregloMemoria=arregloMemoria.map((prop)=>{
        if(parseInt(prop)<10){
            prop="0"+prop;
        }
        return(<p>{prop}</p>);
    });
    return(
        <div className="filaContMemoria">
            {arregloMemoria}
            <p>{String(props.lectura)+String(props.escritura)}</p>

        </div>
    );
}
export default Pagina;