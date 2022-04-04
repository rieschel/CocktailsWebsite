
import { Checkbox, Paper } from "@mui/material";
import { Button } from "@mui/material";
import { Popover } from "@mui/material";
import { Typography } from "@mui/material";
import CheckboxesGroup from "./checkboxesGroup";

export default function Filtermenu(){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const buttonRef = React.useRef();
    function handleClick() {
        setAnchorEl(buttonRef.current);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div >
        <Typography>Anchor point of popover here</Typography>
        <Button ref={buttonRef} aria-describedby={id} variant="contained" onClick={handleClick}>
            Open Popover
        </Button>
        <Popover
            sx={{maxHeight: 1000 , width:700}}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
            }}
            transformOrigin={{
            vertical: "top",
            horizontal: "center"
            }}
        >
            <CheckboxesGroup/>
            {/* <Typography>The content of the Popover.</Typography> */}
        </Popover>
        </div>
    );


};