import React, { Component } from 'react';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';

class HospitalIcon extends Component {
    render() {
        const color = this.props.color || "black";
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path fill={color} stroke="black" strokeWidth=".5" d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8.5-2h3v-3.5H17v-3h-3.5V7h-3v3.5H7v3h3.5z" />
            </svg>
        );
    }
}

export function hospitalIcon(color) {
    const icon = L.divIcon({
        className: 'custom-icon',
        html: ReactDOMServer.renderToString(<HospitalIcon color={color} />)
    });
    return icon
}

class BusstopIcon extends Component {
    render() {
        const color = this.props.color || "black";
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path fill={color} stroke="black" strokeWidth=".5" d="M12 2c-4.42 0-8 .5-8 4v10c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4zm5.66 2.99H6.34C6.89 4.46 8.31 4 12 4s5.11.46 5.66.99zm.34 2V10H6V6.99h12zm-.34 9.74l-.29.27H6.63l-.29-.27C6.21 16.62 6 16.37 6 16v-4h12v4c0 .37-.21.62-.34.73z" />
                <circle fill={color} stroke="black" strokeWidth=".5" cx="8.5" cy="14.5" r="1.5" />
                <circle fill={color} stroke="black" strokeWidth=".5" cx="15.5" cy="14.5" r="1.5" />
            </svg>
        );
    }
}

export function busstopIcon(color) {
    const icon = L.divIcon({
        className: 'custom-icon',
        html: ReactDOMServer.renderToString(<BusstopIcon color={color} />)
    });
    return icon
}

class MallIcon extends Component {
    render() {
        const color = this.props.color || "black";
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path fill={color} stroke="black" strokeWidth=".5" d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z" />
            </svg>
        );
    }
}

export function mallIcon(color) {
    const icon = L.divIcon({
        className: 'custom-icon',
        html: ReactDOMServer.renderToString(<MallIcon color={color} />)
    });
    return icon
}