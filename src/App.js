import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


import React, { Component } from 'react'

export default class App extends Component {
  pageSize = '12';
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News pageSize={this.pageSize} country='in' key="general"  category='general' />}></Route>
            <Route exact path="/business" element={<News pageSize={this.pageSize} country='in'  key="business" category='business' />}></Route>
            <Route exact path="/entertainment" element={<News pageSize={this.pageSize} country='in' key="entertainment"  category='entertainment' />}></Route>
            <Route exact path="/health" element={<News pageSize={this.pageSize} country='in' key="health"  category='health' />}></Route>
            <Route exact path="/sports" element={<News pageSize={this.pageSize} country='in' key="sports" category='sports' />}></Route>
            <Route exact path="/science" element={<News pageSize={this.pageSize} country='in' key="science"  category='science' />}></Route>
            <Route exact path="/technology" element={<News pageSize={this.pageSize} country='in' key="technology"  category='technology' />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}