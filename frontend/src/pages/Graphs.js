import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const parseTime = (timeString) => {
    let dateTimeSplitted = timeString.split("T")
    let date = dateTimeSplitted[0]
    let time = dateTimeSplitted[1]
    let dateSplitted = date.split("-")
    let timeSplitted = time.split(":")
    return dateSplitted[2] + "." + dateSplitted[1] + "." + dateSplitted[0] + " " + timeSplitted[0] + ":" + timeSplitted[1]
}

function Graphs() {
    // Treba dodati .env fajl
    const apiLink = process.env.REACT_APP_APILINK
    // Stateovi za grafove useState
    const [soundData, setSoundData] = useState([])
    // Data u grafu
    const data = {
        labels: soundData.map(data => parseTime(data.time)),
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: 'Razina buke (dB)',
                data: soundData.map(data => data.value),
                // you can set indiviual colors for each bar
                borderWidth: 5,
                borderColor: "#03a9f4"

            }
        ]
    }

    // Funkcija za dohvacanje iz backenda
    const getSoundData = async () => {
        try {
            // Primjer raspona vremena .getTime() vraca broj milisekundi kaj nam treba
            const time1 = new Date("2015-05-05").getTime()
            const time2 = new Date().getTime()
            // stavil sem zvuka ipak jer ima puno vise podatkov
            const responseSound = await fetch(apiLink + `sound/range?t1=0&t2=${time2}`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            let jsonData = await responseSound.json();
            //jsonData.sort((data1, data2) => data2.time - data1.time)
            console.log(jsonData)
            setSoundData(jsonData)

        } catch (e) {
            console.log(e)
        }
    }

    // Hook za dohvacanje podataka
    useEffect(() => {
        getSoundData()
    }, [])

    // Najbolji nacin za napravit:
    // Napravi jednu komponentu Chart.js i u njoj stavis ovo kaj je dole u returnu
    // I onda samo preko props šaljes podatke koji idu u taj graf
    // To more biti bas ovi podatki iz backenda, ali i naziv grafa itd da bude donekle modularno
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Line Chart</h2>
            <Line
                data={data}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Razina buke u rasponu"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    )

}

export default Graphs