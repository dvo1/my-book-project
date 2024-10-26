import React from 'react'
import { Route, Routes } from "react-router-dom";
import HomePage from './home-page';
import "./App.css";
import BookDetails from './components/pages/book-detail';
const App = () => {
  return (
    <>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/book/:id" element={<BookDetails />} />
    </Routes>
    </>
  )
}

export default App