import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
    },
    menuIcon: {
      marginRight: theme.spacing(2),
    },
    menuTitle: {
      flexGrow: 1,
    },
    container: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(3, 0, 2)
    },
    button: {
      margin: theme.spacing(3),
    },
    formControl: {
      margin: theme.spacing(1),
      // minWidth: 150
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    textarea: {
      backgroundColor: theme.palette.background.paper,
      width: '600px'
    },   
}));

export default useStyles;