import React, { useRef  } from 'react';
import './App.css';

import Autocomplete from './components/autocomplete';
import Hoteles from './components/HotelesPicker';
import Search from './components/otraprueba'





function TextInputWithFocusButton() {

  const refPasajeros =useRef(null)
 
  // const {adulto}=refPasajeros.current.state
  // console.log(adulto);
  return (
    <>
      {/* <Autocomplete /> */}
      {/* <Autocomplete ref={inputE2}/> */}
      {/* <Hoteles ref={refPasajeros}/> */}

      <Search />

      {/* <input ref={inputE1} type="text" /> */}
      {/* <input ref={inputE2} type="text" /> */}
      <span className="iconSearch" >    
        </span>
    </>
  );
}

export default TextInputWithFocusButton;