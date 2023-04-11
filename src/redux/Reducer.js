
const userState={
    token:"",
    user:"",
    interest: []
}

const themeState={
    back: "black",
    front:"white",
    chart: "tomato",
    pharm_chart: "green"
}


export function userReducer(state= userState, action){

    let newState;
    switch (action.type) {
        case "token":
            newState={...state, "token":action.value}
            return newState || state;
        case "connect":
            newState={...state, "user":action.value}
            return newState || state;
        case "disconnect":
            newState={...state, "user":"", token: "", interest: []}
            return newState || state;
        case "interest":
            newState={...state, interest: action.value}
            return newState || state;
        default:
            return state;
    }
}


export function themeReducer(state= themeState, action){

    let newState;
    switch (action.type) {
        case "dark":
            newState={...state, back:"black", front:"white"}
            return newState || state;
        case "default":
            newState={...state, front:"black", back:"white"}
            return newState || state;
        default:
            return state;
    }
}