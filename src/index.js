import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter as Router} from 'react-router-dom';
import {ToastProvider} from 'react-toast-notifications';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
    <ToastProvider>
        <Router basename={process.env.PUBLIC_URL}>
            <App/>
        </Router>
    </ToastProvider>,
    document.getElementById('root'));

