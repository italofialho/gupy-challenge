import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App from '../App';
import { theme } from "../../Themes";


//! TOOLS
import firebase from 'firebase';

class Root extends Component {

    componentWillMount = () => {

        let config = {
            apiKey: "AIzaSyAr9hks07KaVhIGJgEWjI77ODbSb_3zDg8",
            authDomain: "gupy-challenge.firebaseapp.com",
            databaseURL: "https://gupy-challenge.firebaseio.com",
            projectId: "gupy-challenge",
            storageBucket: "gupy-challenge.appspot.com",
            messagingSenderId: "54475293298"
        };

        firebase.initializeApp(config);
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        );
    }
}

export default Root;