import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Components/Root';
import registerServiceWorker from './registerServiceWorker';

import 'typeface-roboto';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
