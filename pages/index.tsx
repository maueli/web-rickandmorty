import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState, createContext, useContext } from 'react';

import { Box } from '../components/item';
import { Form } from '../components/form';

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


const initValue = {
  name:'',
  gender: '',
  origin: '',
  status:'',
  species:''
}
const Context = createContext(initValue);

const Home = () => {
  return(
    <Context.Provider value={initValue}>
      <Home_/>
    </Context.Provider>
  )
}

const Home_: NextPage = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState('https://rickandmortyapi.com/api/character?');
  const [next, setNext] = useState('');
  const [prev, setPrev] = useState('');
  const [isLoading, setIsLoading] = useState(false);


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
      .catch(err=>console.log(err))
    }
  },[url])

  if (isLoading) return <h2>Loading...</h2>

  return (
    <div className={styles.container}>
      <h1> Rick {'&'} Morty Characters </h1>
      <Form/>
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

