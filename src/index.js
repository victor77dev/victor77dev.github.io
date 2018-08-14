import React from 'react';
import ReactDOM from 'react-dom';

import Page from './containers/Page';
import data from './data.json';

ReactDOM.render(
  <Page data={data} />,
  document.getElementById('root'));