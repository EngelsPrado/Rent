import React, { Component } from 'react';
import moment from 'moment'
import Auto from './activos/Auto'
//import index from './../config/Alg'
import {Breadcrumb, CurrentRefinements , RefinementList,Panel,InstantSearch, SearchBox, Hits, Highlight,ClearRefinements, Pagination,Menu } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';

const algoliaClient = algoliasearch(
    'XKANI2Z3LS',
    '2ea01e5cced441cabb02dfaa584ec4c4'
  );
  
  const searchClient = {
    search(requests) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            processingTimeMS: 0,
          })),
        });
      }
  
      return algoliaClient.search(requests);
    },
  };
  
class Test extends Component {

    constructor(props) {
        super(props);
      
        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.Hit=this.Hit.bind(this)
      }
    Hit(props){
        console.log(props.hit)
        return (
          
          <Auto auto={props.hit}></Auto>
        );
       }

    render() {
        return (
            <div>
              <div className="row">
                  <div className="col-12">
                  <InstantSearch searchAsYouType={false}   searchClient={searchClient} indexName="rent">
                    <SearchBox autoFocus showLoadingIndicator/>
                     <hr></hr>
                      <CurrentRefinements /> 
                    <ClearRefinements />
                    <Menu attribute="clasificacion" />  
                
                                
                    <Hits  hitComponent={this.Hit}/>
                    <hr></hr>  
                   
                   <Pagination />
                  </InstantSearch> 
                  </div>  

              </div>        
            </div>
        );
    }
}

export default Test;  