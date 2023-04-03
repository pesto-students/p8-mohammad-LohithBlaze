import { useSelector, useDispatch } from "react-redux";
import { lightReducer } from "./store.js";

export default function Room(props) {
    const isLightOn = useSelector(state => state.isLightOn);
    const dispatch = useDispatch();
    const lightedness = isLightOn ? "lit" : "dark";
    return (
        <div className={`room ${lightedness}`}>
            the room is {lightedness}
            <br />
            <button onClick={() => dispatch(lightReducer())}>flip</button>
        </div>
    );
}
