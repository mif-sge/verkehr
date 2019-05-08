import React from 'react';
import ReactDOM from 'react-dom';
import StreetMap from '../views/StreetMap';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StreetMap />, div);
    ReactDOM.unmountComponentAtNode(div);
});
