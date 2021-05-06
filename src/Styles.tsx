import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      flexGrow: 1,
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
    table: {
      minWidth: 650,
    },
  }));

  export default useStyles;