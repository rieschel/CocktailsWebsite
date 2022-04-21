import {createTheme} from '@mui/material/styles';


const theme = createTheme( {
    typography: {
        fontFamily: 'Raleway, Arial',
    },
    palette: {
        background: {
            main: "#F3F5E0",
            //main: "#DEFFD2",
        },
        primary: {
            // main: "#03045e",
            //main: "#EC7979",
           // main: "#ccd5ae",
           main: "#89A894",
        },
        secondary: {
            // main: "#e2eafc",
            //main: "#FFE6E2",
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
            /* main: "#FFFFFF", */
        },
        test:{
           // main: "#475652",
            main: "#FFFFFF",
        }
        
    },
});

export default theme;