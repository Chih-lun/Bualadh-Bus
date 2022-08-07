import "./Home.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import setMilliseconds from "date-fns/setMilliseconds";
import addWeeks from "date-fns/addWeeks";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faSun } from "@fortawesome/free-solid-svg-icons";
import GoogleMap from "./GoogleMap";
import { useState, useEffect } from "react";
import Axios from "axios";
import axios from "axios";
import { Oval } from 'react-loader-spinner';

export default function Home() {

    // ********** WEATHER RELATED CODE **********

    // receive the current_weather from django
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        /* REMOVE PORT FROM URL TO USE WITH DOCKER */
        Axios.get("http://127.0.0.1:8000/api/current_weather/").then((res) =>
            setWeather(res.data).catch((err) => console.log(err))
        );
    }, []);


    // user input
    const [time, setTime] = useState(
        setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0), 0)
    );
    const [location, setLocation] = useState([]);
    const [destination, setDestination] = useState([]);
    const [receivedData, setReceivedData] = useState([]);
    const [error, setError] = useState(false);
    const [waitingPrediction, setWaitingPrediction] = useState(false);
    const [waitingRoute, setWaitingRoute] = useState(false);


    const postData = (e) => {
        setWaitingPrediction(true);
        setStopArray([]);
        setReceivedData([]);
        setError(false);
        e.preventDefault();
        /* REMOVE PORT FROM URL TO USE WITH DOCKER */
        Axios.post("http://127.0.0.1:8000/api/user_input/", {
            time,
            location,
            destination,
        })
            .then((res) => {
                setWaitingPrediction(false);
                if (res.data.error == 'error') {
                    setError(true);
                } else {
                    console.log("time: ", time);
                    console.log("location: ", location);
                    console.log("destination: ", destination);
                    setReceivedData(res.data.result);
                    console.log(receivedData);
                    console.log(weather);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [stopArray, setStopArray] = useState([]);
    const clickHandlerDisplayRoute = (event, line) => {
        // displays the user's route when selected
        event.preventDefault();
        setWaitingRoute(true);

        // method to get textual day from W3Schools https://www.w3schools.com/jsref/jsref_getday.asp
        const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        let day = weekday[time.getDay()];
        console.log("param: ", line);
        console.log("param: ", location);
        console.log("param: ", destination);
        console.log("param: ", day);

        /* REMOVE PORT TO USE WITH DOCKER */
        Axios.get('http://127.0.0.1:8000/api/stop_location/' + line + '/' + location + '/' + destination + '/' + day + '/')
            .then((res) => {
                console.log('Stop locations', res.data);
                setWaitingRoute(false);
                // update the stop array with results obtained
                setStopArray(res.data['result']);

            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div id="home">
            <div class="container-fluid">
                <section>
                    <div class="d-sm-flex">
                        <div class="col-lg-4 p-2">
                            <div id="home-section1">
                                <h3 id="home-section-title">Route Planner</h3>
                                <Form className="user-input-form">
                                    <DatePicker
                                        className="date-picker"
                                        selected={time}
                                        onChange={(date) => setTime(date)}
                                        showTimeSelect
                                        minDate={new Date()}
                                        maxDate={addWeeks(new Date(), 1)}
                                        timeFormat="HH:mm"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                    <Form.Control
                                        placeholder="Beginning stop ID"
                                        name="location"
                                        id="home-section1-input"
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                    <Form.Control
                                        placeholder="Ending stop ID"
                                        name="destination"
                                        id="home-section1-input"
                                        onChange={(e) => setDestination(e.target.value)}
                                    />
                                    <Button
                                        className="submit-button"
                                        variant="primary"
                                        type="submit"
                                        onClick={postData}
                                        disabled={
                                            time.length === 0 ||
                                            location.length === 0 ||
                                            destination.length === 0
                                        }
                                    >
                                        Submit
                                    </Button>
                                </Form>
                                <div id='prediction-results'>
                                    {waitingPrediction && <Oval
                                        className="prediction-loader"
                                        height="60"
                                        width="60"
                                        radius="9"
                                        color='green'
                                    />
                                    }
                                    {error && <p id="home-section1-error">Error message</p>}
                                    {receivedData.map((r) => {
                                        return (
                                            <>
                                                <div class='line-result-box'>
                                                    <table>
                                                        <tr>
                                                            <td class='result-table-item'><span id='r-line'>{r.line}</span></td>
                                                            <td class='result-table-item'><span id='r-time'>{r.hours}hr {r.mins}min</span></td>
                                                        </tr>
                                                    </table>

                                                    {!waitingRoute && <button class='show-route' onClick={event => clickHandlerDisplayRoute(event, r.line)}>display route</button>}
                                                    {waitingRoute && <Oval
                                                        className='route-loader'
                                                        height="45"
                                                        width="45"
                                                        radius="20"
                                                        color='green'
                                                    />
                                                    }
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                            </div>
                            <div id="home-section2">
                                <h3 id="home-section-title">Current Weather</h3>
                                {weather.map((w) => {
                                    return (
                                        <>
                                            <p>
                                                Temp: {w.temp} C <br />
                                                Wind Speed: {w.wind_speed} <br />
                                                Clouds: {w.clouds}% <br />
                                                Rain: {w.rain} mm<br />
                                                Humidity: {w.humidity} %<br />
                                                <br />
                                            </p>
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                        <div class="col-lg-8" id="home-section3">
                            <GoogleMap items={stopArray} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

