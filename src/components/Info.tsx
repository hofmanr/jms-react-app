import { Typography } from '@material-ui/core';
import React from 'react';

interface InfoProps {
    title: string;
    message: string;
}

function Info({ title, message }: InfoProps) {
    return (
        <div>
            <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                {message}
            </Typography>
        </div>
    );
}

export default Info;