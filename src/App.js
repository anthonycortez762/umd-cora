import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Home from './components/Home/Home';
import About_Us from './components/About_Us/About_Us';
import Research_Study from './components/Research_Study/Research_Study';
import { Navbar, Image } from 'react-bootstrap';
import cora_logo from './assests/cora_logo.png'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignInModal: false,
      showCreateAccountModal: false,
      userLoggedIn: false,
      userName: '',
    }
  }

  handleLogin = (event) => {
    event.preventDefault();
    this.setState({
      showSignInModal: false,
      userLoggedIn: true,
      userName: '',
    });
  }

  renderSignInModal = () => {
    const { showSignInModal } = this.state;
    return (
      <Modal
        show={showSignInModal}
        onHide={() => this.setState({showSignInModal: false})}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={this.handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">Login</Button>
        </Form>
        </Modal.Body>
      </Modal>
    );
  }

  renderCreateAccountModal = () => {
    const { showCreateAccountModal } = this.state;
    return (
      <Modal
        show={showCreateAccountModal}
        onHide={() => this.setState({showCreateAccountModal: false})}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create an Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={this.handleCreateAccount}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">Create Account</Button>
        </Form>
        </Modal.Body>
      </Modal>
    );
  }

  render(){
    const {
      userLoggedIn,
    } = this.state;

    return (
      <Router>
        <div className="App">
          {this.renderSignInModal()}
          {this.renderCreateAccountModal()}
          <Navbar id="main-navbar">
            <Navbar.Brand href="/"><Image id="cora_logo" src={cora_logo}></Image></Navbar.Brand>
            <Nav variant="pills" defaultActiveKey="/" activeKey={window.location.pathname} className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/general-info">General Opioid Information and Statistics</Nav.Link>
              <Nav.Link href="/donate">Donate and Join CORA</Nav.Link>
              <Nav.Link href="/research">Research Portion</Nav.Link>
              <Nav.Link href="/about_us">About Us</Nav.Link>
            </Nav>
            {!userLoggedIn &&
              <div className="signed-out-content">
                <Button variant="outline-dark" style={{marginRight: 10}} onClick={() => this.setState({showSignInModal: true})}>Sign In</Button>
                <Button variant="outline-dark" onClick={() => this.setState({showCreateAccountModal: true})}>Create Account</Button>
              </div>
            }
            {userLoggedIn &&
              <div className="signed-in-content">
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>Signed in as: Dummy Name</Navbar.Text>
                </Navbar.Collapse>
                <Button variant="outline-dark" onClick={() => this.setState({userLoggedIn: false})}>Sign Out</Button>
              </div>
            }
          </Navbar>
          <div id="body-wrapper">
            <Switch>
              <Route path="/general-info">
                <div>info</div>
              </Route>
              <Route path="/donate">
                <div>donate</div>
              </Route>
              <Route path="/research">
                <Research_Study></Research_Study>
              </Route>
              <Route path="/about_us">
                <About_Us></About_Us>
              </Route>
              <Route path="/">
                <Home/>
              </Route>
            </Switch>
          </div>
          <Navbar id="footer" className="mr-auto">
            <Navbar.Brand><Image id="cora_logo" src={cora_logo}></Image></Navbar.Brand>
            <Navbar className="ml-auto flex-column">
              <Navbar.Text>CORA FAQ |</Navbar.Text>
              <Navbar.Text>Contact |</Navbar.Text>
              <Navbar.Text>Joining Us</Navbar.Text>
            </Navbar>
          </Navbar>
        </div>
      </Router>
    );
  }
}

export default App;
