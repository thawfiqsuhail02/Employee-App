export const initstate={
    data:[],
    loading:true
}

export const reducer=(state=initstate,action)=>{
    if(action.type=="ADD_DATA"){
        return{
            ...state,
            data:action.payload
        }
    }
    if(action.type=="SET_LOADING"){
        return{
            ...state,
            loading:action.payload
        }
    }
    return state
}