export const initialState = {
    name:'',
    gender: '',
    origin: '',
    status:'',
    species:''
};

export const reducer = (state:any=initialState,action:any) => {
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