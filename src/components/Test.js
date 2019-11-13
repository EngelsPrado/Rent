import React, { useContext } from 'react';
import moment from 'moment'
import Auto from './activos/Auto'
//import index from './../config/Alg'
import {Breadcrumb, CurrentRefinements , RefinementList,Panel,InstantSearch, SearchBox, Hits, Highlight,ClearRefinements, Pagination,Menu } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import {UserContext} from './../Providers/UserProvider'
import Login from './InicioSesion/Login';

const algoliaClient = algoliasearch(
    'QHNRM6MI8E',
    'e6a2cc55534d6411d953249c82282be6'
  );
  
  
  
const  Test =()=> {

  const user = useContext(UserContext);
  console.log(user)
   const Hit=(props)=>{
        console.log(props.hit)
        return (
          
          <Auto auto={props.hit} auth={user} ></Auto>
        );
       }
 
        return (
            <div>
              {
                user?
              <div className="row">
                  <div className="col-12">
                  <InstantSearch searchAsYouType={true}   searchClient={algoliaClient} indexName="rent">
                    <SearchBox autoFocus showLoadingIndicator/>
                     <hr></hr>
                     <RefinementList attribute="clasificacion" />
                    <ClearRefinements />
                          
                    <Hits  hitComponent={Hit}/>
                    <hr></hr>  
                   
                   <Pagination />
                  </InstantSearch> 
                  </div>  

              </div>  
              :<Login></Login>
             }      
            </div>
        );
    
}

export default Test;  