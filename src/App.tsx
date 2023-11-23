import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Registration, Home } from './pages';
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
