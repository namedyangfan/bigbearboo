import React from 'react'

export default class LoadingState extends React.Component{

  render(){
    return(
      <div className='row'>
        <div className="col s12 m12 offset-s5 offset-m5">
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>            
          </div>
        </div>
      </div>
    )
  }
}