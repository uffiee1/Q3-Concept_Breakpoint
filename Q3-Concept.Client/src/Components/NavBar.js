import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  link: {
    textDecoration: "none",
    color: "white",
    "&:hover": {
      color: "white",
    },
  },
}));

function NavBar() {
  const classes = useStyles();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button variant="contained" color="primary"><Link to="/" className={classes.link}>Machines</Link></Button> 
          <Button variant="contained" color="primary"><Link to="/ComponentPage" className={classes.link}>Componenten</Link></Button> 

          {/* <Button variant="contained" color="primary"> <Link to="/">Machines</Link> </Button> 
          <Button variant="contained" color="inherit"> <Link to="/ComponentPage">Componenten</Link></Button> */}
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default NavBar