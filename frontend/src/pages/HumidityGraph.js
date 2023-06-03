import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ChartComp from "../components/ChartComp";
import Button from '@mui/material/Button';
Chart.register(CategoryScale);

const parseTime = (timeString) => {
    let dateTimeSplitted = timeString.split("T")
    let date = dateTimeSplitted[0]
    let time = dateTimeSplitted[1]
    let dateSplitted = date.split("-")
    let timeSplitted = time.split(":")
    return dateSplitted[2] + "." + dateSplitted[1] + "." + dateSplitted[0] + " " + timeSplitted[0] + ":" + timeSplitted[1]
}

let graphType = "Cijeli izvještaj"

function HumidityGraph() {
    const apiLink = process.env.REACT_APP_APILINK
    // Stateovi za grafove useState
    const [humidityData, setHumidityData] = useState([])
    // Data u grafu
    const data = {
        labels: humidityData.map(data => parseTime(data.time)),
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: 'Vlažnost zraka (%)',
                data: humidityData.map(data => data.value),
                // you can set indiviual colors for each bar
                borderWidth: 5,
                borderColor: "#03a9f4"

            }
        ]
    }

    // Funkcija za dohvacanje iz backenda
    const getHumidityData = async () => {
        try {
            // Primjer raspona vremena .getTime() vraca broj milisekundi kaj nam treba
            const time2 = new Date().getTime()
            graphType = "Cijeli izvještaj"
            const responseHum = await fetch(apiLink + `humidity/range?t1=0&t2=${time2}`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await responseHum.json();
            //jsonData.sort((data1, data2) => data2.time - data1.time)
            console.log(jsonData)
            setHumidityData(jsonData)

        } catch (e) {
            console.log(e)
        }
    }

    const getHumidityDataMonth = async () => {
        try {
            // Primjer raspona vremena .getTime() vraca broj milisekundi kaj nam treba
            const time1 = new Date().getTime() - 30 * 24 * 60 * 60 * 1000
            const time2 = new Date().getTime()
            graphType = "Mjesečni izvještaj"
            const responseHum = await fetch(apiLink + `humidity/range?t1=${time1}&t2=${time2}`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await responseHum.json();
            //jsonData.sort((data1, data2) => data2.time - data1.time)
            console.log(jsonData)
            setHumidityData(jsonData)

        } catch (e) {
            console.log(e)
        }
    }
    const getHumidityDataWeek = async () => {
        try {
            // Primjer raspona vremena .getTime() vraca broj milisekundi kaj nam treba
            const time1 = new Date().getTime() - 7 * 24 * 60 * 60 * 1000
            const time2 = new Date().getTime()
            graphType = "Tjedni izvještaj"
            const responseHum = await fetch(apiLink + `humidity/range?t1=${time1}&t2=${time2}`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await responseHum.json();
            //jsonData.sort((data1, data2) => data2.time - data1.time)
            console.log(jsonData)
            setHumidityData(jsonData)

        } catch (e) {
            console.log(e)
        }
    }
    const getHumidityDataDay = async () => {
        try {
            // Primjer raspona vremena .getTime() vraca broj milisekundi kaj nam treba
            //const time1 = new Date("2015-05-05").getTime()
            const time1 = new Date().getTime() - 1 * 24 * 60 * 60 * 1000
            const time2 = new Date().getTime()
            graphType = "Dnevni izvještaj"
            const responseHum = await fetch(apiLink + `humidity/range?t1=${time1}&t2=${time2}`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = []
            if (responseHum.count > 0) {
                let jsonData = await responseHum.json();
            }            
            console.log(jsonData)
            setHumidityData(jsonData)

        } catch (e) {
            console.log(e)
        }
    }

    // Hook za dohvacanje podataka
    useEffect(() => {
        getHumidityData()
    }, [])

    return (
        <div>
            <div >
                <Button style={{ textAlign: "center", margin:"15px"  }} variant="contained" onClick={() => getHumidityData()}>Cijeli izvještaj</Button>
                <Button style={{ textAlign: "center", margin:"15px"  }} variant="contained" onClick={() => getHumidityDataMonth()}>Mjesečni izvještaj</Button>
                <Button style={{ textAlign: "center", margin:"15px"  }} variant="contained" onClick={() => getHumidityDataWeek()}>Tjedni izvještaj</Button>
                <Button style={{ textAlign: "center", margin:"15px"  }} variant="contained" onClick={() => getHumidityDataDay()}>Dnevni izvještaj</Button>
            </div>
            <ChartComp title="Kretanje vlažnosti zraka" graphT={graphType} data={data} />
        </div>
    )

}

export default HumidityGraph