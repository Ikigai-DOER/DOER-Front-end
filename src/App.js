import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Main from "./Main";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import UserContext from "./UserContext";

function App() {
    
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (localStorage.userInfo) {
            setUserInfo(JSON.parse(localStorage.userInfo));
        }
    }, []);

    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            <Router>
                <Switch>
                    <Route exact path='/' component={LandingPage}/>
                    <Route path='/site' component={Main}/>
                    <Route exact path='/404' component={NotFound}/>
                    <Redirect to='/404'/>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
