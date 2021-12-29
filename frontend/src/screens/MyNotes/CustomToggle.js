import { useAccordionButton } from 'react-bootstrap/AccordionButton';

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

  export default CustomToggle