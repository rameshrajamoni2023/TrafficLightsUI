import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Timer from './Timer';

const API_URL = 'https://localhost:7060/api/TrafficLight';

function App() {
    const [trafficLightData, setTrafficLightData] = useState(null);
    
    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL);
            setTrafficLightData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

 
    // Use useEffect to fetch data on component mount and set up a timer for repeated requests
    useEffect(() => {
        // Fetch data immediately on component mount
        fetchData();

        // Set up a timer to fetch data every 5 seconds (adjust the interval as needed)
        const timer = setInterval(() => {
            fetchData();
        }, 1000);

        // Clean up the timer when the component unmounts
        return () => clearInterval(timer);
    }, []);

     
    return (
        <div className="app">
            <p>Traffic Light Status</p>
            {trafficLightData ? (
                <div> 
                    <table id="jsonTable" border="1">
                        <thead>
                        </thead>
                        <tbody>
                            <tr>{new Date().toLocaleString()}</tr>
                            <tr>Peak Hour : {trafficLightData.North.isPeakHour ? "Yes" : "No"}</tr>
                            <tr>North Right Turn Green Enabled : {trafficLightData.North.isNorthRightTurnGreen ? "Yes" : "No"}</tr>
                            <tr>All Cross Traffic is Red (secs) : {Math.min(trafficLightData.North.redTimer
                                ,trafficLightData.South.redTimer
                                , trafficLightData.East.redTimer
                                , trafficLightData.West.redTimer)}</tr>
                            <tr><td><Timer /></td>
                                <td>{trafficLightData.North.direction}</td>
                                <td>{trafficLightData.North.currentColor}</td>
                                <td><div className={`traffic-light light-color-${trafficLightData.North.currentColor}`}></div></td>
                            </tr>
                            <tr><td><Timer /></td>
                                <td>{trafficLightData.South.direction}</td>
                                <td>{trafficLightData.South.currentColor}</td>
                                <td><div className={`traffic-light light-color-${trafficLightData.South.currentColor}`}></div></td>
                            </tr>
                            <tr><td><Timer /></td>
                                <td>{trafficLightData.East.direction}</td>
                                <td>{trafficLightData.East.currentColor}</td>
                                <td><div className={`traffic-light light-color-${trafficLightData.East.currentColor}`}></div></td>
                            </tr>
                            <tr><td><Timer /></td>
                                <td>{trafficLightData.West.direction}</td>
                                <td>{trafficLightData.West.currentColor}</td>
                                <td><div className={`traffic-light light-color-${trafficLightData.West.currentColor}`}></div></td>
                            </tr>
                            <tr>Hit Refresh [F5] to Reset the timers.</tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

}

export default App;

