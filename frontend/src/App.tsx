import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './pages/LoginSignup/LoginSignup';
import Events from './pages/EventsList/Events';
import DetailedEvent from './pages/DetailedEvent/DetailedEvent';
import { AddEventForm } from './pages/AddEventForm/AddEventForm';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './App.css';
import { AuthProvider } from './context/AuthContext'
import { NavBar } from './pages/NavBar/NavBar';
import { UserProfile } from './pages/UserProfile/UserProfile';
import Clubs from './pages/ClubSearch/Clubs';
import { EditEventForm } from './pages/AddEventForm/EditEventForm';
import ClubDetail from './pages/ClubDetail/ClubDetail';
import { HomePage } from './pages/HomePage/HomePage';
import {TestPage} from './pages/TestPage';
import {TempClubEventListPage} from './pages/TempClubEventListPage';
import ClubEventList from './pages/ClubEventList/ClubEventList';

function App() {
  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginSignup which="LOG IN"/>} />
            <Route path="/login" element={<LoginSignup which="LOG IN"/>} />
            <Route path="/user/login" element={<LoginSignup which="LOG IN"/>} />
            <Route path="/signup" element={<LoginSignup which="SIGN UP" />} />
            <Route path="/club/signup" element={<LoginSignup which="CLUB SIGN UP" />} />
            <Route path="/club/login" element={<LoginSignup which="CLUB LOG IN" />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<DetailedEvent which="USER"/>} />
            <Route path="/club/addEvent" element={<AddEventForm/>} />
            <Route path="/club/editEvent/:id" element={<EditEventForm/>} />
            <Route path="/club/events/:id" element={<DetailedEvent which="CLUB"/>} />
            <Route path="/navbar" element={<NavBar/>} />
            <Route path="/profile" element={<UserProfile/>} /> {/* Test Route */}
            <Route path="/clubs" element={<Clubs/>} />
            <Route path = "/clubDetail/:id" element = {<ClubDetail which="USER"/>}/>
            <Route path = "/club/clubDetail/:id" element = {<ClubDetail which="CLUB"/>}/>
            <Route path = "/club/profile" element = {<ClubDetail which = "CLUB"/>}/>
            <Route path = "/homepage" element = {<HomePage/>}/>
            {/* <Route path = "/testpage" element = {<TestPage/>}/> */}
            <Route path = "/club/tempEventList" element = {<TempClubEventListPage/>}/>
            <Route path="/clubEventList/:id" element={<ClubEventList which="CLUB"/>} />
          </Routes>
        </div>
      </Router>
      </LocalizationProvider>
    </AuthProvider>

  );
}

export default App;
