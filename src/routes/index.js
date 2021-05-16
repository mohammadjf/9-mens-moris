import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Playground from "../components/Playground";

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/">
                        <Playground channel={this.props.channel}/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default Routes;