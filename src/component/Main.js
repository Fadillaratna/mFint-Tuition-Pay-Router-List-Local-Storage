import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Student from './Student';
import Class from './Class';
import Officer from './Officer';
import Tuition from './Tuition';
import Transaksi from './Transaksi';
import Laporan from './Laporan';

const Main = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/student" component={Student}/>
            <Route exact path="/officer" component={Officer}/>
            <Route exact path="/class" component={Class}/>
            <Route exact path="/tuition" component={Tuition}/>
            <Route exact path="/transaksi" component={Transaksi}/>
            <Route exact path="/laporan" component={Laporan}/>
        </Switch>
    );
};

export default Main;