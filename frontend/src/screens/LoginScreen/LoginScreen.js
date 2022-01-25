import { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import './LoginScreen.css';
import { login } from "../../actions/userActions";

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate('/mynotes')
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));

    }


    return (
        <MainScreen title='LOGIN'>
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='formBasicPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button variant='primary' type='submit'>Submit</Button>
                </Form>
                <Row className='py-3'>
                    <Col>
                        New Customer? <Link to='/register'>Register Here</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    );
}

export default LoginScreen;