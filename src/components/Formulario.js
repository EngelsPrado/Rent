import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'


const required = value => (value || typeof value === 'number' ? undefined : 'Required')
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength50 = maxLength(300)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue13 = minValue(13)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{7})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined




class CreateBus extends Component {

  state={
    value:undefined
  }


  renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div className="col-6">
      <label >< h4 className=" ">{label}</h4></label>
      <div className="form-group">
        <input className="form-control" {...input}
         placeholder={label} type={type} ref={this.fileInput}
       />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

  photo = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div className="col-6">
      <label ><h4>{label}</h4></label>
      <div className="form-group">
        <input  {...input}
         placeholder={label} type={type} multiple accept="image/png, .jpeg , .jpg" value={this.state.value}
       />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

     handleChange=(event)=> {
       //Modificado
      const photo=event.target.files
      this.setState=({
        value:photo
      })
    }    
    render() {
      const {submitting,handleSubmit,pristine,reset}=this.props
        
        return (
           
            
            <div  className="container mt-0 bg-light shadow  mb-10 rounded formulario p-5">
                 <h2 className="mb-3" >Registra tu anuncio!</h2> 
                 <form className="row" onSubmit={handleSubmit} >
                  <Field
                    name="titulo"
                    type="text"
                    component={this.renderField}
                    label="Titulo del anuncio"
                    validate={[required, maxLength50, minLength2]}
                    warn={alphaNumeric}
                  />
                  
                  
                  <div className="col-4 mt-2">
                  <h4 className="d-block">Categoria</h4>  
                  <Field
                    name="clasificacion"
                    type="text"
                    component="select"
                    label="Tipo de Negocio"
                    validate={[required]}
                    className="form-control"
                  > 
                   <option> </option>
                   <option value="bienRaiz">Bienes raices</option>
                   <option value="auto">Autos</option>
                   <option value="ocio">ocio</option>
                   
                  </Field>   
                    
                  </div> 
                  <div className="col-6 mt-2">
                  <h4 className="d-block">Departamento</h4>  
                  <Field
                    name="departamento"
                    type="text"
                    component="select"
                    label="Departamento"
                    validate={[required]}
                    className="form-control"
                  > 
                   <option> </option>
                   <option value="managua">Managua</option>
                   <option value="masaya">Masaya</option>
                   <option value="leon">Leon</option>
                   
                  </Field>   
                    
                    
                  </div>
                  <div className="col-4 mt-2" >
                  <h4 className="d-block">Direccion</h4> 
                  <Field
                    className="form-control " rows="2"
                    name="direccion"
                    type="text"
                    component="textarea"
                    label="Dirección  del Local"
                    validate={[required]}
                  />
                  </div>
                   
                  <div className="col-6 mt-2">
                  <h4 className="d-block">Telefono</h4> 
                    <Field
                     className="form-control"
                      name="telefono"
                      type="input"
                      component="input"
                      validate={[required,number]}
                  
                    />  


                  </div>

                 <div className="col-4 mt-2">
                 <h4>Descripcion</h4>
                 <Field className="form-control " rows="2"
                    name="descripcion"
                    type="text"
                    component="textarea"
                    label="Descripción"
                    validate={[maxLength50,minLength2]}
                    warn={aol}
                  />
                 </div>
                  
                <Field
                  name="photo"
                  type="file"
                  component={this.photo}
                  label="photo"
                  validate={[required]}
                />
          
                <div className="ml-25 mt-5">
                  <button className="btn btn-outline-primary" type="submit" disabled={pristine || submitting}  >
                    Submit
                  </button>
                  <button className="btn btn-outline-secondary"  type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                  </button>
                </div>
    </form>
  
            </div>
        );
    }
}

   
   export default reduxForm({
      form: 'simple', // a unique identifier for this form   
    })
  (CreateBus)