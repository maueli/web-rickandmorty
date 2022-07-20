import React, { useEffect, useReducer, useState } from 'react';
import { initialState, reducer } from '../store/reducer';



export const Inputs = ({init, type, dispatch}:any)=>{
    const [ value, setValue ] = useState('');
    useEffect(()=>{
        dispatch({
            type,
            payload:value
        })
    },[value])
    return(
        <div>
            <input name={init} placeholder={init} value={value} type="text" onChange={(e)=>setValue(e.target.value)}/>
        </div>
    )
}

// export const useInputs = () => {
//     const [values, setValues] = useState([]);
// }

export const Form = ({onSearch, dispatch}:any) => {
    //const [state, dispatch] = useReducer( reducer, initialState );
    return(
        <div>
            <Inputs init={'Name'} type='name' dispatch={dispatch}/>
            <Inputs init={'Status'} type='status' dispatch={dispatch}/>
            <Inputs init={'Species'} type='species' dispatch={dispatch}/>
            <Inputs init={'Gender'} type='gender'dispatch={dispatch} />
            <Inputs init={'Origin'} type='origiin' dispatch={dispatch}/>
            <button type='button' onClick={onSearch}>
                Search
            </button>
        </div>
    )
};

