import './App.css'
import { useEffect, useState } from 'react';
import { useLocationStore } from './store/useLocationStore';
import { Search } from './components/SearchComponent/SearchComponent';

const App = () => {

  return (
    
    <div className='search-container'>
        <h1>Weather App</h1>
        <Search />
    </div>
  )
}

export default App