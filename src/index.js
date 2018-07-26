import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ApplicationViews from './ApplicationViews';
import registerServiceWorker from './registerServiceWorker';
import { Route, Redirect } from "react-router-dom"
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
<Router>
    <ApplicationViews />
</Router>, document.getElementById('root'));
registerServiceWorker();
