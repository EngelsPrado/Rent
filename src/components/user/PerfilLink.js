import React, { Component } from 'react';
import Auto from './../../components/activos/Auto';
import firebase from 'firebase'
import './style.css'
import Nav from '../activos/Nav';

class PerfilLink extends Component {


    constructor(props) {
        super(props)
        this.state = {
          a:[],
          lastVisible:null,
          err:'invisible',
          btn:'visible',
        }
    
        this.renderA = this.renderA.bind(this);
        // this.more=this.more.bind(this)
    
        
      }


    componentDidMount(){
      this.renderA();
    }

    renderA()
  {
    const db=firebase.firestore()
    //Mejorar
    db.collection("anuncios").limit(3).where("authorId","==",this.props.dni).get().then(querySnapshot=>{
      var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
       console.log("last", lastVisible.data());
       this.setState(prevState => ({
        a: [
            ...prevState.a,
               querySnapshot
           ],
           lastVisible
      }))
           
  
      }).catch(err=>console.log(err))

  }
 

    render() {
        const array=this.state.a

        return (
            <div>
                <div className="row"> 
                  <div className="col-lg-12" >
                  <Nav></Nav>
                  </div>
                    {
                      array && array.map(querySnapshot=>{
                        return querySnapshot && querySnapshot.docs.map(doc=>{
                       
                        return <Auto auto={doc.data()} key={doc.id} />
                    
                      })

                      }) 

                    }
                 </div>


            </div>
        );
    }
}

export default PerfilLink;

