import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState, createContext, useContext, useReducer } from 'react';

import { Box } from '../components/item';
import { Form } from '../components/form';
import { initialState, reducer } from '../store/reducer';

export enum Filters {
  Name = 'name',
  Gender = 'gender',
  Status = 'status',
  Species = 'species',
  Origin = 'origin'
}


const renderItem = ({item, index})=>(
  <div key={index} className={styles.containerBox}>
    <Box>
      <h1 className={styles.title}>{item.name}</h1>
      <h4 className={styles.text}>{item.status}</h4>
      <h4 className={styles.text}>{item.species}</h4>
      <h4 className={styles.text}>{item.gender}</h4>
      <h4 className={styles.text}>{item.origin.name}</h4>
      <Image src={item.image} width={100} height={100}/>
    </Box>
  </div>
)

const Context = createContext({reducer, initialState});

const Home = () => {
  return(
    <Context.Provider value={{
      reducer,
      initialState
    }}>
      <Home_/>
    </Context.Provider>
  )
}

// https://rickandmortyapi.com/api/character/?name=rick&status=alive

const URL_BASE = 'https://rickandmortyapi.com/api/character/?';

const Home_: NextPage = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState('https://rickandmortyapi.com/api/character?');
  const [next, setNext] = useState('');
  const [prev, setPrev] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [state, dispatch] = useReducer( reducer, initialState );

  const isComplete = (input:any) => {
    if(input && input.length) return input;
    return false;
  };

  const onSearch = () => {
    console.log(state);
    let filters = [];
    let urlFilter = ''; 
    for( let filter in state){
      if( state[filter] !== ''){
        const key = filter;
        const value = state[filter]; 
        urlFilter = urlFilter+`${key}=${value}&`
      }
    }
    setUrl(URL_BASE+urlFilter);
  };

  useEffect(()=>{
    if( url !== null ){
      setIsLoading(true);
      fetch(url)
      .then(res=>res.json())
      .then( data => {
        setNext(data.info.next);
        setPrev(data.info.prev);
        setData(data.results);
        setIsLoading(false);
      })
      .catch(err=>{
        setIsLoading(false);
        console.log(err)
        setError(true);
        setTimeout(()=>setError(false), 3000) 
      })
    }
  },[url])

  if (isLoading) return <h2>Loading...</h2>
  if (error) return <h2> No hay resultados</h2>

  return (
    <div className={styles.container}>
      <h1> Rick {'&'} Morty Characters </h1>
      <Form onSearch={onSearch} dispatch={dispatch}/>
      <div className={styles.containerButtons}>
        <button type='button' onClick={()=>setUrl(prev)}>
          Prev
        </button>
        <button type='button' onClick={()=>setUrl(next)}>
          Next
        </button>
      </div>

      <div className={styles.list}>
        {data.map((item,index)=>renderItem({item,index}))}
      </div>

    </div>
  )
}



export default Home

