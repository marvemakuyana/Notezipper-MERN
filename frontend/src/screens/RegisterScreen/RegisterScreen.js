import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pic, setPic] = useState('"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            setMessage(null);
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json"
                    }
                };

                setLoading(true);

                const { data } = await axios.post(
                    '/api/users', {
                    name,
                    pic,
                    email,
                    password
                },
                    config
                );

                console.log(data)
                localStorage.setItem('userInfo', JSON.stringify(data))
                setLoading(false);
            } catch (error) {
                setError(error.response.data.message)
            }
        }
    }

    const postDetails = (pics) => {
        if (!pics) {
            return setPicMessage('Please Select an image');
        }
        setPicMessage(null);

        if (pics.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            const data = new FormData();
            data.append('file', pics)
            data.append('upload_preset', 'notezipper');
            data.append('cloud_name', 'dea0emqng');
            fetch('https://api.cloudinary.com/v1_1/dea0emqng/image/upload', {
                method: 'post',
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setPic(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            return setPicMessage('Please Select an image');
        }
    }

    return (
        <MainScreen title='REGISTER'>
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" value={name} placeholder="Enter name" onChange={(e) => setName(e.target.value)} ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='formBasicPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" value={confirmPassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    {picMessage && (
                        <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                    )}
                    <Form.Group className="mb-3" controlId='pic'>
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control type="file" onChange={(e) => postDetails(e.target.files[0])} placeholder="Upload Profile Picture" ></Form.Control>
                    </Form.Group>

                    <Button variant='primary' type='submit'>Submit</Button>
                </Form>
                <Row className='py-3'>
                    <Col>
                        Have an Account? <Link to='/login'>Login</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    );
}

export default RegisterScreen;