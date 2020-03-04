import styled from 'styled-components';
import { Form, Button, ToggleButton } from 'react-bootstrap';

export const CONTAINER = styled.div`
  background: #FCFCFC;
  width: 500px;
  margin: 0 auto;
  margin-top: 1em;

  @media(min-width: 786px) {
    width: 60%;
  }

  label {
    color: #8063e1;
    font-size: 1.2em;
    font-weight: 400;
  }

  .form-group {
    margin-bottom: 2.5em;
  }

  .error {
    border: 2px solid #FF6565;
  }

  .error-message {
    color: #FF6565;
    padding: .5em .2em;
    height: 1em;
    position: absolute;
    font-size: .8em;
  }
`;

export const FORM = styled(Form)`
  width: 90%;
  text-align: left;
  padding-top: 2em;
  padding-bottom: 2em;

  @media(min-width: 786px) {
    width: 50%;
  }
`;

export const BUTTON = styled(Button)`  
  border: none;
  font-size: 1.2em;
  font-weight: 400;
  margin: 20px;
`;

export const TOGGLE = styled(ToggleButton)`    
  font-size: 1.2em;
`;