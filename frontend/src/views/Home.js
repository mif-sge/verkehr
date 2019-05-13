import React, { useState, useEffect } from 'react';
import logo from '../assest/img/logo.svg';
import Button from "@material-ui/core/Button";

import { DEMO, API } from '../urls/urls';

/**
 * generates color codes for text and background color dependent on day time
 * format is for example '#ffffff' for white
 * return tuple of text and background colors
 */
function gernerateColorCodes() {
    //some needed constant variables
    const minRGB = 32;
    const maxRGB = 255;
    const today = new Date();
    const currentHour = today.getHours();

    //defining the variables
    var t = 0;
    var textColor = "#000000";
    if (currentHour < 6 || currentHour > 18) {
        textColor = "#ffffff";
    }

    //background should be white around 12 o'clock and close to black at 0 o'clock
    if (currentHour < 12) {
        t = currentHour / 12;
    } else {
        t = (24 - currentHour) / 12;
    }

    //changing rgb value to hex code
    const hex = Number(parseInt(t * maxRGB + (1 - t) * minRGB)).toString(16);
    const backgroundColor = "#" + hex + hex + hex;

    return [textColor, backgroundColor]; //Flieg los, Kartoffelbrei
}

/**
 * creates the home screen
 */
function Home() {

    const [colorCodes, setColorCode] = useState(gernerateColorCodes());
    const [response, setResponse] = useState("");

    async function buttonClicked() {
        const answer = await fetch(API, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        setResponse(await answer.text());



    }

    //gets called at page load once
    useEffect(() => {
        //sets the timer for the refresh of the colors
        setInterval(() => {
            setColorCode(gernerateColorCodes());
        }, 1000 * 60 * 60); //every hour
    });

    // structure of DOM-tree
    return (
        <div className="App">
            <header className="App-header" style={{ color: colorCodes[0], backgroundColor: colorCodes[1] }}>
                <img src={logo} className="App-logo" alt="logo" />
                <p>Hello World!</p>
                <Button onClick={buttonClicked}>Test</Button>
                <p>Response:{response}</p>
            </header>
        </div>
    );
}

export default Home;