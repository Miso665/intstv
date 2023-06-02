import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CampaignIcon from '@mui/icons-material/Campaign';
const apiLink = process.env.REACT_APP_APILINK

function AdminPage() {
    const [upozorenje, setUpozorenje] = useState(null)
    const [datum, setDatum] = useState(null)

    const sendAlert = async () => {
        try {
            const response = await fetch(apiLink + "alert",
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await response.json();
            setUpozorenje(true)
            setDatum(new Date())

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div style={{ margin: "auto", width: "50%" }}>
            <Card sx={{ minWidth: 275, minHeight: 200 }} style={{ margin: "20px", flex: "1 0 100%" }}>
                <CardContent>
                    <Typography variant="h2" component="div" style={{ textAlign: "center" }}>
                        <CampaignIcon fontSize="50px" />
                    </Typography>
                    <Typography variant="h5" component="div" style={{ textAlign: "center" }}>
                        Pošalji upozorenje knjižnici
                    </Typography>
                    <br />
                    <Typography variant="h5" component="div" style={{ textAlign: "center" }}>
                        <Button style={{ textAlign: "center" }} color="error" variant="contained" onClick={() => sendAlert()}>Upozorenje</Button>
                    </Typography>
                    {upozorenje ? <><br />
                        <Typography sx={{ mb: 1.5, fontStyle: "italic" }} color="text.secondary" style={{ textAlign: "center" }}>
                            Upozorenje poslano u {datum.toString()}
                        </Typography></> : <></>}
                </CardContent>
            </Card >
        </div>
    )

}

export default AdminPage