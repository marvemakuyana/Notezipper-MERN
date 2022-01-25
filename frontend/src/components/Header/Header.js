import { Navbar, Form, FormControl, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logout } from '../../actions/userActions';

const Header = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/')
    }

    return (

        <Navbar bg="primary" expand="lg" variant='dark'>
            <Container>
                <Navbar.Brand>
                    <Link to='/'>Note Zipper</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='m-auto'>
                        <Form >
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        </Form>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/mynotes"> My Notes
                            {/* <Link to='/mynotes'> My Notes</Link> */}
                        </Nav.Link>
                        <NavDropdown title="Marve Makuyana" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>


                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Header