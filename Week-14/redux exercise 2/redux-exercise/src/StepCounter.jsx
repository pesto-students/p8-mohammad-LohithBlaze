import React from 'react';
import { increment, reset } from "./store.js";
import { useDispatch, useSelector } from "react-redux";

export default function StepCounter(props) {
    const counter = useSelector(state => state.value);
    const dispatch = useDispatch();
    return (
        <div>
            <p>Steps: {counter}</p>
            <button onClick={() => dispatch(increment())}>Add Step</button>
            <button onClick={() => dispatch(reset())}>Reset Steps</button>
        </div>
    );
}