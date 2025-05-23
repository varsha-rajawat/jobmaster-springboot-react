import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import JobListPage from './pages/jobPages/JobListPage';
import JobFormPage from './pages/jobPages/JobFormPage';
// import AddJobPage from './pages/jobPages/AddJobPage';
// import EditJobPage from './pages/jobPages/EditJobPage' ;


function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path="/jobs" element={<PrivateRoute><JobListPage /></PrivateRoute>} />
          <Route path="/jobs/new" element={
            <PrivateRoute>
              <JobFormPage />
            </PrivateRoute>
          } />

          <Route path="/jobs/edit/:id" element={
            <PrivateRoute>
              <JobFormPage />
            </PrivateRoute>
          } />
        </Routes>

        {/* <Route path="/jobs/add" element={<PrivateRoute><AddJobPage /></PrivateRoute>} />
        <Route path="/jobs/edit/:id" element={<PrivateRoute><EditJobPage /></PrivateRoute>} /> */}
      </main>
    </>
  );

}

export default App
