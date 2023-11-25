import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Registration, Home } from './pages';
import { MyLayout } from './components/MyLayout';
import { PrivateRoute } from './utils/components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
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
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
