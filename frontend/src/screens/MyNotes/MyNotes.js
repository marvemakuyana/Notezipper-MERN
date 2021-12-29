import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import notes from "../../data/notes";

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!'),
    );
  
    return (
      <button
        type="button"
        style={{ border: 'none' }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }
  
const MyNotes = () => {

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) { }
    }
    return (
        <MainScreen title='Welcome Back Marv...'>
            <Link to='createnote'>
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">Create New Note</Button>
            </Link>
            {
                notes.map(note => (
                    <Accordion key={note._id}>
                        <Card style={{ margin: 10 }}>
                            <Card.Header style={{ display: 'flex' }}>
                                <span style={{ color: "black", textDecoration: 'none', flex: 1, cursor: 'pointer', alignSelf: "center", fontSize: 18 }}>
                                    <CustomToggle eventKey="0">{note.title}</CustomToggle >
                                </span>

                                <div>
                                    <Button href={`/note/${note._id}`}>Edit</Button>
                                    <Button variant="danger" className="mx-2" onClick={() => deleteHandler(note._id)}> Delete</Button>
                                </div>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>

                                    <h4>
                                        <Badge bg="success" text="light"> Category - {note.category}</Badge>
                                    </h4>
                                    <blockquote className="blockquote mb-0">
                                        <p>
                                            {note.content}
                                        </p>
                                        <footer className="blockquote-footer">
                                            Creaated on - date
                                        </footer>
                                    </blockquote>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                ))


            }

        </MainScreen>
    );
}

export default MyNotes