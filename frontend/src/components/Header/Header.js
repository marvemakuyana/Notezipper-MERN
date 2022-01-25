import { Navbar, Form, FormControl, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();

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
                            <NavDropdown.Item onClick={() => {
                                localStorage.removeItem('userInfo');
                                navigate('/')
                            }}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Header