import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import useStyles from '../Styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

interface PayloadDialogProps {
    title: string;
    payload?: string;
    open: boolean;
    setOpen: (state: boolean) => void;
}

export default function PayloadDialog({ title, payload, open, setOpen }: PayloadDialogProps) {
    const classes: ClassNameMap = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll="paper"
            fullWidth={false}
            maxWidth="lg"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
            <DialogContent dividers={true}>
                <DialogContentText
                    id="scroll-dialog-description"
                    variant="body2"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    <TextareaAutosize 
                        aria-label="minimum height" 
                        rowsMin={15}
                        disabled={true}
                        // rowsMax={15}
                        placeholder="Minimum 3 rows" 
                        className={classes.textarea}
                        defaultValue={payload + "\n"}
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
              </Button>
            </DialogActions>
        </Dialog>
    );
}