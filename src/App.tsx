import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Home from './pages/Home';
import { MyLayout } from './components/MyLayout';
import { PrivateRoute } from './utils/components/PrivateRoute';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MyLayout>
                  <Home />
                </MyLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
