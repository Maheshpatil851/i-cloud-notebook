import React from 'react'
import Notes from './Notes'

const Home = (props) => {
  const {ShowAlert} = props
  return (  
    <div> 
      <div className='container my-3'>
        <Notes ShowAlert={ShowAlert} />
      </div>
      
    </div>
  );
}

export default Home

