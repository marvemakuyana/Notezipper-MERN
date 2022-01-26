import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import axios from "axios";

import MainScreen from "../../components/MainScreen";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function SingleNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    const dispatch = useDispatch();

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { loading, error } = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;

    const deleteHandler = (index) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteNoteAction(index))
        }
        navigate('/mynotes')

    }

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/notes/${id}`);

            setTitle(data.title);
            setCategory(data.category);
            setContent(data.content);
            setDate(data.updatedAt);
        }
        fetching();
    }, [id, date, successDelete])

    const resetHandler = () => {
        setTitle("");
        setCategory("");
        setContent("");
    };

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateNoteAction(id, title, content, category));

        if (!title || !content || !category) return;

        resetHandler();
        navigate('/mynotes')
    }

    return (
        <MainScreen title='Edit Note'>
            <Card>
                <Card.Header>Edit note</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {loadingDelete && <Loading />}
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        {errorDelete && (
                            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
                        )}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='title'
                                value={title}
                                placeholder="Enter the title"
                                onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as='textarea'
                                value={content}
                                placeholder="Enter the content"
                                rows={4}
                                onChange={(e) => setContent(e.target.value)} />
                        </Form.Group>
                        {content && (
                            <Card>
                                <Card.Header>Note Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}
                        <Form.Group controlId="content">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='content'
                                value={category}
                                placeholder="Enter the Category"
                                onChange={(e) => setCategory(e.target.value)} />
                        </Form.Group>
                        <br />
                        {loading && <Loading size={50} />}
                        <Button type='submit' variant="primary">Update Note</Button>
                        <Button className="mx-2"
                            onClick={() => deleteHandler(id)}
                            variant="danger">Delete Note</Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Updated on - {new Date().toLocaleDateString()}
                </Card.Footer>
            </Card>
        </MainScreen>
    );


}

export default SingleNote;