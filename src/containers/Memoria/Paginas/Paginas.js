import React from 'react';
import Pagina from './Pagina/Pagina';

const Paginas =(props)=>{
    let paginas=props.pags.map((pagina,key)=>{return(<Pagina pag={pagina.pag} 
        llegada={pagina.llegada}
        ultAccs={pagina.ultAccs}
        accs={pagina.accs}
        lectura={pagina.lectura}
        escritura={pagina.escritura}
        r={pagina.r} key={key}/>);})
    return(
        <div className="contenidoMemoria">
            {paginas}
        </div>
    );
}

export default Paginas;