import React from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import HomePage from "./view/HomePage"
import LoginPage from "./view/LoginPage"
import RankPage from "./view/RankPage"
import ProblemsPage from "./view/ProblemsPage"
import ProblemPage from "./view/ProblemPage"
import JudgeStatusPage from "./view/JudgeStatusPage"
import AdminPage from "./view/AdminPage"
import PrivateRoute from "./route/PrivateRoute"
import JudgeDetailPage from "./view/JudgeDetailPage"
import AnnouncementPage from "./view/AnnouncementPage"
import JudgeResultStatisticPage from "./view/JudgeResultStatisticPage"
import TestPage from "./view/testPage"
// import "./style.css"

const MainRouter = (props) => {
  const location = useLocation()
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />

    <Route path="/rank" element={<RankPage />} />
    <Route path="/problems" element={<ProblemsPage />} />
    <Route path="/problem" element={<ProblemPage />} />
    <Route path="/announcement" element={<AnnouncementPage />} />
    <Route path="/judgeStatus" element={<JudgeStatusPage />} />
    <Route path="/judgeDetail" element={<JudgeDetailPage />} />
    <Route path="/judgeResultStatistic" element={<JudgeResultStatisticPage />} />
    <Route path="/admin" element={<AdminPage />} />
    <Route path="/test" element={<TestPage />} />

  </Routes>
}

export default MainRouter
