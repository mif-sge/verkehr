import React from 'react';
import ReactDOM from 'react-dom';
import Plan from '../views/Plan';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Plan />, div);
    ReactDOM.unmountComponentAtNode(div);
});
