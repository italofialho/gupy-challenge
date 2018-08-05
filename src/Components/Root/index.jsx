import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App from '../App';
import { theme } from "../../Themes";

function Root() {
    return (
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    );
}

export default Root;