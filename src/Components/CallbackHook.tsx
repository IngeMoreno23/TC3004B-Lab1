import React from 'react'
import { useCallback, useState } from 'react';
import { ShowIncrement } from './ShowIncrement.tsx';

export const CallbackHook = () => {
    const [counter, setCounter] = useState(10);
    const incrementP = () => {
        setCounter(counter + 1);
        console.log('Callback');
    }
    /*const incrementP = useCallback( ()=> {
    console.log('Callback');
    setCounter ( (value) => value + 1);
    },
    []
    )
    */
    return (
        <>
            <h1>useCallback Hook: {counter} </h1>
            <hr />
            <ShowIncrement increment={incrementP} />
        </>
    )
}