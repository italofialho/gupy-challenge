
import { createMuiTheme } from '@material-ui/core/styles';
export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#458dff',
            main: '#1771ff',
            dark: '#104fb2',            
            contrastText: '#fff'
        },
        secondary: {
            light: '#44f0cc',
            main: '#16edc0',
            dark: '#0fa586',
            contrastText: '#fff'
        },
        danger: {
            backgroundColor: '#F44336',
            color: '#fff'
        }
    },
});