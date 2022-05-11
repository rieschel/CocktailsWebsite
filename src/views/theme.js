import {createTheme} from '@mui/material/styles';


const theme = createTheme( {
    typography: {
        fontFamily: 'Raleway, Arial',
    },
    palette: {
        background: {
            main: "#F3F5E0",
        },
        primary: {
           main: "#89A894",
        },
        secondary: {
            main: "#e9edc9"
        },
        heart: {
            main: "#E52323",
        },
        white: {
            main: "#fefae0",
        },
        black: {
            main: "#475652",
        },
        test:{
            main: "#FFFFFF",
        }
        
    },
});

export default theme;