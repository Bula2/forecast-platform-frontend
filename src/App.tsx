import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Login,
  Registration,
  Home,
  CreateForecast,
  Instructions,
  Settings,
  MyForectasts,
  Forecast,
  Page404,
  Contacts,
} from './pages';
import { MyLayout } from './components/MyLayout/MyLayout';
import { PrivateRoute } from './utils/components/PrivateRoute';
import { AuthProvider, ForecastProvider } from './context';
function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <ForecastProvider>
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
              <Route
                path="/create"
                element={
                  <PrivateRoute>
                    <MyLayout>
                      <CreateForecast />
                    </MyLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/instructions"
                element={
                  <PrivateRoute>
                    <MyLayout>
                      <Instructions />
                    </MyLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <MyLayout>
                      <Settings />
                    </MyLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/contacts"
                element={
                  <PrivateRoute>
                    <MyLayout>
                      <Contacts />
                    </MyLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/forecasts"
                element={
                  <PrivateRoute>
                    <MyLayout>
                      <MyForectasts />
                    </MyLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/forecast/:id"
                element={
                  <PrivateRoute>
                    <MyLayout>
                      <Forecast />
                    </MyLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="*"
                element={
                  <PrivateRoute>
                    <Page404 />
                  </PrivateRoute>
                }
              />
            </Routes>
          </ForecastProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
