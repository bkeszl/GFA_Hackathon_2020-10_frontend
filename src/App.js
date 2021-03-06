import React, {useEffect} from 'react';
import './App.css';
import LoggedIn from './components/LoggedIn';
import {useSelector} from "react-redux";
import Lounge from "./components/Lounge";

export default function App() {
    const userFromRedux = useSelector(state => state.redux);
    useEffect(()=>{},
        [userFromRedux.isLoggedIn]);

  return (
    <div className="App">
        <h1>coviDelivery</h1>
        {userFromRedux.isLoggedIn ? <LoggedIn /> : <Lounge />}
    </div>
  );
}
