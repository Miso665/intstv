import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReadingCard from "../components/ReadingCard";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PeopleIcon from '@mui/icons-material/People';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';



function MainPage() {
    const [temperature, setTemperature] = useState("--")
    const [humidity, setHumidity] = useState("--")
    const [peopleCount, setPeopleCount] = useState("--")
    const [sound, setSound] = useState("--")
    const apiLink = process.env.REACT_APP_APILINK

    const getTempFromAPI = async () => {
        try {
            // TEMPERATURE
            const responseTemp = await fetch(apiLink + "temperature/latest",
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await responseTemp.json();
            console.log(jsonData)
            setTemperature(jsonData[0].value)

        } catch (e) {
            console.log(e)
        }
    }

    const getHumidityromAPI = async () => {
        try {
            // HUMIDITY
            const responseHum = await fetch(apiLink + "humidity/latest",
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData2 = await responseHum.json();
            console.log(jsonData2)
            setHumidity(jsonData2[0].value)
        } catch (e) {
            console.log(e)
        }

    }

    const getPeopleFromAPI = async () => {
        try {
            // PEOPLE
            const responsePeople = await fetch(apiLink + "people/latest",
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData3 = await responsePeople.json();
            console.log(jsonData3)
            setPeopleCount(jsonData3[0].value)
        } catch (e) {
            console.log(e)
        }

    }

    const getSoundFromAPI = async () => {
        try {
            // SOUND
            const responseSound = await fetch(apiLink + "sound/latest",
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData4 = await responseSound.json();
            console.log(jsonData4)
            setSound(jsonData4[0].value)
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        getTempFromAPI()
        getHumidityromAPI()
        getPeopleFromAPI()
        getSoundFromAPI()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            getTempFromAPI()
            getHumidityromAPI()
            getPeopleFromAPI()
            getSoundFromAPI()
        }, 60000);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <div style={{
                display: "flex",
                flexWrap: "wrap"
            }}>
                <ReadingCard text="Trenutna temperatura u knjižnici" value={temperature} link="/temperature" unit="°C" icon=<DeviceThermostatIcon fontSize="50px" /> />
                <ReadingCard text="Trenutna vlažnost zraka u knjižnici" value={humidity} link="/humidity" unit="%" icon=<WaterDropIcon fontSize="50px" /> />
                <ReadingCard text="Trenutni broj ljudi u knjižnici" value={peopleCount} link="/people" unit="" icon=<PeopleIcon fontSize="50px" /> />
                <ReadingCard text="Trenutna razina buke u knjižnici" value={sound} link="/sound" unit="dB" icon=<VolumeUpIcon fontSize="50px" /> />
            </div></>
    )

}
export default MainPage