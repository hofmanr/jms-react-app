import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import QueueIcon from '@material-ui/icons/Queue';
import useStyles from '../Styles';
import { ClassNameMap } from '@material-ui/styles';

const MenuBar = () => {
    const classes: ClassNameMap = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <QueueIcon className={classes.menuIcon} />
                    <Typography variant="h6" className={classes.menuTitle}>
                        JMS Client App
          </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default MenuBar;