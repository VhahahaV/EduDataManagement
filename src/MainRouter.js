import React from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import HomePage from "./view/HomePage"
import LoginPage from "./view/LoginPage"
import ClassStudentPage from "./view/ClassPage_student"
import ClassesTeacherPage from "./view/ClassesPage_teacher"
import ClassTeacherPage from "./view/ClassPage_teacher"
import AdminPage from "./view/AdminPage"
import AnnouncementPage from "./view/AnnouncementPage"
import AnnouncementStudentPage from "./view/AnnouncementStudent"
import HomeStudentPage from "./view/homeStudent"
import ClassesStudentPage from "./view/ClassesPage_student"
import StudentsPage from "./view/Students"
import StudyStudentPage from "./view/StudyStudent"
import StudyPage from "./view/Study"
import MyStudyPage from "./view/MyStudy"
// import "./style.css"

const MainRouter = (props) => {
  const location = useLocation()
  return <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/classStudent" element={<ClassStudentPage />} />
    <Route path="/classesTeacher" element={<ClassesTeacherPage />} />
    <Route path="/classTeacher" element={<ClassTeacherPage />} />
    <Route path="/classesStudent" element={<ClassesStudentPage />} />
    <Route path="/announcement" element={<AnnouncementPage />} />
    <Route path="/announcementStudent" element={<AnnouncementStudentPage />} />
    <Route path="/students" element={<StudentsPage />} />
    <Route path="/study" element={<StudyPage />} />
    <Route path="/MyStudy" element={<MyStudyPage />} />
    <Route path="/studyStudent" element={<StudyStudentPage />} />
    <Route path="/admin" element={<AdminPage />} />
    <Route path="/homeStudent" element={<HomeStudentPage />} />

  </Routes>
}

export default MainRouter
