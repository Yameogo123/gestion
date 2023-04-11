import { Provider } from "react-redux";
import Store from "./Store";


export default function Provide({children}) {
    

    return (
        <Provider store={Store}>
            {children}
        </Provider>
    )
}