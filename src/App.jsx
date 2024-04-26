import './App.css'
import { useEffect, useState } from 'react';
import { useLocationStore } from './store/useLocationStore';
import { Search } from './components/Search/SearchComponent';

const App = () => {

  return (
    
    <div className='search-container'>
        <h1>Arrons Weather App</h1>
        <Search />
        
    </div>
  )
}

export default App