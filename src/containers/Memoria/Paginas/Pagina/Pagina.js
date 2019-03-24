import React from 'react';

const Pagina=(props)=>{
    return(
        <div className="filaContMemoria">
            <p>{props.pag}</p>
            <p>{props.r}</p>
            <p>{props.llegada}</p>
            <p>{props.ultAccs}</p>
            <p>{props.accs}</p>
            <p>{props.nur}</p>
        </div>
    );
}
export default Pagina;