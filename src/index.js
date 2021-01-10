import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import BrightId from 'lib.js'

function App(){
   const [ instance, setInstance ] = useState(null)

   useEffect(() => {
     setInstance(new BrightId())
   }, [])

   return(
     <div>
      <button onClick={() => BrightId.verify()}>
        TRIGGER
      </button>
    </div>
   )
}

ReactDOM.render(<App />, document.getElementById('root'))
