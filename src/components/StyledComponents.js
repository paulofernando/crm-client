import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import Header from './Header';

export const CONTAINER = styled.div`
  background: #352f64;
  width: 500px;
  margin: 0 auto;
  margin-top: 1em;

  label {
    color: white;
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
`;

export const BUTTON = styled(Button)`  
  border: none;
  font-size: 1.2em;
  font-weight: 400;
  margin: 20px;
`;

export const HEADER = styled(Header)`    
  font-size: 1.2em;
  background-color: #3f58e3;

  .headerTitle {
    text-align: center;
  }
`;