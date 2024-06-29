import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AnimatedRoutes from './componentes/AnimatedRoutes'

const App = () => {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};


export default App;
