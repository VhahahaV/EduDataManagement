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

    <Route path="/rank" element={<PrivateRoute component={<RankPage />} />} />
    <Route path="/problems" element={<PrivateRoute component={<ProblemsPage />} />} />
    <Route path="/problem" element={<PrivateRoute component={<ProblemPage />} />} />
    <Route path="/announcement" element={<PrivateRoute component={<AnnouncementPage />} />} />
    <Route path="/judgeStatus" element={<PrivateRoute component={<JudgeStatusPage />} />} />
    <Route path="/judgeDetail" element={<PrivateRoute component={<JudgeDetailPage />} />} />
    <Route path="/judgeResultStatistic" element={<PrivateRoute component={<JudgeResultStatisticPage />} />} />
    <Route path="/admin" element={<PrivateRoute component={<AdminPage />} />} />
    <Route path="/test" element={<PrivateRoute component={<TestPage />} />} />

  </Routes>
}

export default MainRouter
