import './App.css';
import React, { Component } from 'react';
import Navbar from './component/Navbar';
import News from './component/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";
export default class App extends Component {
  pageSize=5;
  state={
    progress:0
  }
  setProgress(progress){
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
        color="#f11946"
        progress={this.state.progress}
      />
          <Routes>
            <Route path="/" element={<News  key="general" pageSize={this.pageSize} country="us" category="general" />} />
            <Route path="/business" element={<News  key="business" pageSize={this.pageSize} country="us" category="business" />} />
            <Route path="/entertainment" element={<News  key="entertainment" pageSize={this.pageSize} country="us" category="entertainment" />} />
            <Route path="/health" element={<News key="health" pageSize={this.pageSize} country="us" category="health" />} />
            <Route path="/science" element={<News key="science" pageSize={this.pageSize} country="us" category="science" />} />
            <Route path="/sports" element={<News key="sports" pageSize={this.pageSize} country="us" category="sports" />} />
            <Route path="/technology" element={<News key="technology" pageSize={this.pageSize} country="us" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

