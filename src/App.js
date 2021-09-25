import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// const sortByOptions = [
//   {
//     id: 0,
//     displayText: 'Highest',
//     value: 'Highest',
//   },
//   {
//     id: 2,
//     displayText: 'Lowest',
//     value: 'Lowest',
//   },
// ]

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
)

export default App
