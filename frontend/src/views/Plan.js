import React, { useState } from 'react';

import { DEMO } from '../urls/urls';

import Button from "@material-ui/core/Button";

function Plan() {

    const [response, setResponse] = useState("");

    function buttonClicked() {
        fetch(DEMO, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => setResponse(response))
            .catch(error => {
                setResponse(JSON.stringify(error));
                console.error(error, "THIS SHIT FAILED!");
            });
    }

    return (
        <div>
            <h2>Plan</h2>
            <Button simple onClick={buttonClicked}>Test</Button>
            <p>Response:{response}</p>
        </div>
    );
}

export default Plan;