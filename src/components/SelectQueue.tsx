import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';
import useStyles from '../Styles';
import { Queue } from '../common/types';

interface SelectQueueProps {
    queues: Queue[];
    selectedQueue: (queue: Queue) => void;
}

function SelectQueue({ queues, selectedQueue }: SelectQueueProps) {
    const classes = useStyles();
    const [queue, setQueue] = React.useState<string>('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        let value: string = event.target.value as string;
        let key: number = +value;
        let que: Queue | undefined = queues.find(q => q.id === key);
        setQueue(value);
        console.log('Queue Selected');
        selectedQueue(que!);
    };

    console.log(queues);

    return (
        <div>
            <Grid container spacing={2} justify="center">
                <Grid item>
                    <FormControl className={classes.formControl} style={{minWidth: 150}}>
                        <InputLabel id="queues-label">Queue</InputLabel>
                        <Select
                            labelId="queues-label"
                            id="queues-select"
                            value={queue}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {queues.map(q =>(
                                <MenuItem key={q.id} value={q.id}>{q.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button className={classes.button} variant="outlined">
                        Refresh
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default SelectQueue;