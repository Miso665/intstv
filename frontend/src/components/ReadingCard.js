import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function ReadingCard(props) {
    return (
        <Card sx={{ minWidth: 275, minHeight: 200 }} style={{ margin: "20px", flex: "1 0 21%" }}>
            <CardContent>
                <Typography variant="h2" component="div" style={{ margin: "auto", width: "20%", textAlign: "center" }}>
                    {props.icon}
                </Typography>
                <Typography variant="h4" component="div" style={{ textAlign: "center" }}>
                    {props.value} {props.unit}
                </Typography>
                <br />
                <Typography>
                    {props.text}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" href={props.link}>Povijest mjerenja</Button>
            </CardActions>
        </Card>
    )

}