import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from '../App';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#458dff',
            main: '#1771ff',
            dark: '#104fb2'
        },
        secondary: {
            light: '#44f0cc',
            main: '#16edc0',
            dark: '#0fa586'
        },
    },
});

function Root() {
    return (
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    );
}

export default Root;