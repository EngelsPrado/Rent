import React, { Fragment } from 'react';


const CreateBus =()=> {

    const handleChange=(event)=> {
       //Modificado
     // const photo=event.target.files
     // this.setState=({
     //   value:photo
     // })
    }    
 
        return (
          <Fragment>
            <form action="">
        <h2>REGISTRO</h2>
        <input type="text" name="Marca" placeholder="Marca"/>
        <input type="text" name="Categoria" placeholder="Categoria"/>
        <input type="text" name="Color" placeholder="Color"/>
        <input type="text" name="Transmision" placeholder="Transmision"/>
        <input type="text" name="Kilometraje" placeholder="Kilometraje"/>
        <input type="text" name="Combustible" placeholder="Combustible"/>

        <input type="button" value="Guardar" id="Boton"/>
         </form>
    </Fragment>    
        );
    
}

   
export default 
  CreateBus