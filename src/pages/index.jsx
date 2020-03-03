import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import 'bootstrap/dist/css/bootstrap.min.css';

import Contact from './contact';
import Contacts from './contacts';
import CourtCases from './court-cases';
import Dashboard from './dashboard';
import ContactFormContainer from './contact-form-container';
import CreateCourtCaseForm from './case-form';
import CreateContactForm from './contact-form';
//import { Footer, PageContainer } from '../components/';

export default function Pages() {
  return (
    <Fragment>
      <Router primary={false} component={Fragment}>
        <Dashboard path="/" />
        <CourtCases path="/cases" />
        <Contacts path="/contacts" />
        <Contact path="/contact/:contactId" />
        <CreateContactForm path="/contact/create"/>
        <CreateCourtCaseForm path="/case/create"/>
      </Router>
    </Fragment>
  );
}