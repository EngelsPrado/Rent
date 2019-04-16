import React, { Component } from 'react';
import Auto from '../activos/Auto';
import { connect } from 'react-redux'
import firebase from 'firebase'

class MyAnuncios extends Component {
    constructor(props) {
        super(props)
        this.state = {
          a:{}
        }
    
        this.renderA = this.renderA.bind(this);
       // this.getAnuncio=this.getAnuncio.bind(this);
      }
    
    
      componentDidMount()
      {
         this.renderA()
      }
       
      renderA()
      {
        const db=firebase.firestore()
        db.collection("anuncios").where("authorId", "==", this.props.auth.uid).get().then(querySnapshot=>{
               this.setState({
                 a:querySnapshot
               })
      
          })
    
      }

    render() {
        const querySnapshot=this.state.a.docs
        console.log(querySnapshot)  
        return (
            <div className="row">
                 {
                       querySnapshot && querySnapshot.map(doc=>{
                        //  console.log(doc.data()) ;
                       return <Auto auto={doc.data()} key={doc.id} />
                      })
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
      //authError: state.auth.authError,
      auth: state.firebase.auth
    }
  }
export default connect(mapStateToProps) (MyAnuncios);
