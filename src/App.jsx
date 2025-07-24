import React, {useEffect, useState} from 'react'
import Footer from './Components/Footer/Footer'
import PopularQuestions from "./Components/Pages/PopularQuestions.jsx"
import Login from "./Components/Pages/Login.jsx";
import Register from "./Components/Pages/Register.jsx";
import Profile from "./Components/Pages/Profile.jsx";
import Header from "./Components/Header/Header.jsx";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import QuestionPage from "./Components/Pages/QuestionPage.jsx";
import AskSection from "./Components/Pages/AskQuestion.jsx";
import AdminPanel from "./Components/Pages/AdminPanel.jsx";
import SearchQuestions from "./Components/Pages/Search.jsx";
import AnswerPage from "./Components/Pages/AnswerPage.jsx";

// PreRelease version
export default function App() {
    return (
        <>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={Wrapper(<PopularQuestions/>)} />
                    <Route path="/login" element={Wrapper(<Login/>)} />
                    <Route path="/register" element={Wrapper(<Register/>)} />
                    <Route path="/profile" element={Wrapper(<Profile/>)} />
                    {/*<Route path="/questionView" element={Wrapper(<QuestionPage/>)} />*/}
                    <Route path="/askQuestion" element={Wrapper(<AskSection/>)} />
                    <Route path="/admin" element={Wrapper(<AdminPanel/>)} />
                    <Route path="/search/:text" element={Wrapper(<SearchQuestions/>)} />
                    <Route path="/question/:id" element={Wrapper(<QuestionPage/>)} />
                    <Route path="/answer/:aid/:rid" element={Wrapper(<AnswerPage/>)} />
                    <Route path="*" element={<p>404 : Page not found</p>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}


function Wrapper(component){
    return (
        <>
            <Header/>
            {component}
            <Footer/>
        </>
    )
}
