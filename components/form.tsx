import React, { useEffect, useReducer, useState } from 'react';

const initialState = {
    name:'',
    gender: '',
    origin: '',
    status:'',
    species:''
};

export const reducer = (state,action) => {
    switch(action.type){
        case 'name':
            return{
                ...state,
                name: action.payload
            };
        case 'species':
            return{
                ...state,
                species: action.payload
            };
        case 'origin':
            return{
                ...state,
                origin: action.payload
            };
        case 'gender':
            return{
                ...state,
                gender: action.payload
            };
        case 'status':
            return{
                ...state,
                status: action.payload
            };
    }
}



export const Inputs = ({init, type, dispatch})=>{
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

export const Form = () => {
    const [state, dispatch] = useReducer( reducer, initialState );
    return(
        <div>
            <Inputs init={'Name'} type='name' dispatch={dispatch}/>
            <Inputs init={'Status'} type='status' dispatch={dispatch}/>
            <Inputs init={'Species'} type='species' dispatch={dispatch}/>
            <Inputs init={'Gender'} type='gender'dispatch={dispatch} />
            <Inputs init={'Origin'} type='origiin' dispatch={dispatch}/>
            <button type='button' onClick={()=>console.log(state)}>
                Search
            </button>
        </div>
    )
};

