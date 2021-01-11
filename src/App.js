import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { Navbar, Image } from 'react-bootstrap';

import FindResource from './components/FindResource/FindResource';
import AboutUs from './components/AboutUs/AboutUs';
import ResearchStudy from './components/ResearchStudy/ResearchStudy';
import HowToUseCORABase from './components/HowToUseCORABase/HowToUseCORABase';
import cora_logo from './assests/cora_logo.png'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignInModal: false,
      showCreateAccountModal: false,
      showResetPasswordModal: false,
      userLoggedIn: false,
      userName: '',
    }
  }

  handleLogin = (event) => {
    event.preventDefault();
    this.setState({
      showSignInModal: false,
      showResetPasswordModal: false,
      userLoggedIn: true,
      userName: '',
    });
  }


  renderResetPasswordModal = () => {
    const { showResetPasswordModal } = this.state;
    return (
      <Modal
        show={showResetPasswordModal}
        onHide={() => this.setState({showResetPasswordModal: false})}
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Modal.Title>Reset Password</Modal.Title>
          <Form onSubmit={this.handleResetPassword}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginLeft: 0, marginTop: 0}}>Send Request</Button>
            <Form.Text>You will shortly receive an email to reset your password</Form.Text>
            <br />
            <Button variant="primary" onClick={() => this.setState({showResetPasswordModal: false, showSignInModal: true})}>Return to Sign In</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  renderSignInModal = () => {
    const { showSignInModal } = this.state;
    return (
      <Modal
        show={showSignInModal}
        onHide={() => this.setState({showSignInModal: false})}
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Modal.Title>Welcome Back!</Modal.Title>
          <Form onSubmit={this.handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Check label="Remember my sign in" />
            <Button variant="primary" type="submit">Sign In</Button>
            <Form.Text className="fake-link" onClick={() => this.setState({showSignInModal: false, showResetPasswordModal: true})}>Forgot your password?</Form.Text>
            <Form.Text className="fake-link" onClick={() => this.setState({showSignInModal: false, showCreateAccountModal: true})}>Create an Account</Form.Text>
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
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Modal.Title>Create an Account</Modal.Title>
          <Form onSubmit={this.handleCreateAccount}>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Check label="Sign up for our newsletter to receive updates from CORA" />
            <Button variant="primary" type="submit">Sign Up!</Button>
            <Form.Text className="fake-link" onClick={() => this.setState({showCreateAccountModal:false, showSignInModal: true})}>I already have an account</Form.Text>
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
          {this.renderResetPasswordModal()}
          {this.renderSignInModal()}
          {this.renderCreateAccountModal()}
          <Navbar id="main-navbar" expand="lg">
            <Navbar.Brand href="/"><Image id="cora_logo" src={cora_logo}></Image></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="pills" defaultActiveKey="/" activeKey={window.location.pathname} className="mr-auto">
              <Nav.Link href="/">Find a Resource</Nav.Link>
              <Nav.Link href="/how-to-use-corabase">How to Use CORAbase</Nav.Link>
              <Nav.Link href="/join-a-research-study">Join a Research Study</Nav.Link>
              <Nav.Link href="/about-us">About Us</Nav.Link>
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
            </Navbar.Collapse>
          </Navbar>
          <div id="body-wrapper">
            <Switch>
              <Route path="/how-to-use-corabase">
                <HowToUseCORABase></HowToUseCORABase>
              </Route>
              <Route path="/join-a-research-study">
                <ResearchStudy></ResearchStudy>
              </Route>
              <Route path="/about-us">
                <AboutUs></AboutUs>
              </Route>
              <Route path="/">
                <FindResource/>
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
