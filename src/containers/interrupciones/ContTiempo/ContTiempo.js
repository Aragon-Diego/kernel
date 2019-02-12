import React from 'react';
import './ContTiempo.css';

const ContTiempo = (props) =>{
  let tiempo=props.tiempo ? props.tiempo:0;  
  return(
    <div>
        <p class="tiempo">Tiempo actual: {tiempo}</p>
    </div>
  );
};


export default ContTiempo;