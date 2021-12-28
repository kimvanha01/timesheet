import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
const useStyles = makeStyles({
    notFound: {
        height: "100vh",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
function NotFound() {
    const classes = useStyles();
    return (
        <div className={classes.notFound}>
            <Typography variant="h1" > 404 NOT FOUND ! </Typography>
        </div>
    );
}

export default NotFound;