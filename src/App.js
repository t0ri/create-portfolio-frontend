import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './app.css'

import Home from './Routes/Home/Home.jsx'
import ProjectIndex from './Routes/ProjectIndex/ProjectIndex.jsx'
// import ProjectShow from './Routes/ProjectShow/ProjectShow.jsx'

const fetch = require('node-fetch')

export default class App extends React.Component {
  constructor(props) {
    super(props)

    // Initialize Projects Array
    this.projects = []
  }

  componentDidMount() {
    document.title = 'Portfolio'
    fetch('/api/projects').then((res) => {
      return res.json()
    }).then((json) => {
      // Deconstruct Projects JSON into `projects`
      // Push `projects` to this.projects
      const { projects } = json
      for (let i = 0; i < projects.length; i++) {
        this.projects.push(projects[i])
      }
      
    }).catch((err, json) => {
      console.log(err.message)
    })
  }

  render() {
    return (  
        <div className="App">
          <Router>
            <div>
              <Link to="/projects">Projects</Link>
              <Link to="/">Home</Link>
              <Route path="/projects" render={() => <ProjectIndex projects={this.projects} />} />
              <Route path="/" exact component={Home} />
              {/* <Route 
                path={`${match.url}/${this.projects.title}`}
                render={() => <ProjectShow project={projects} />}
              /> */}
            </div>
          </Router>
        </div>
    )
  }
}

