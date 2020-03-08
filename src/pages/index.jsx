import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import 'bootstrap/dist/css/bootstrap.min.css';

import Contact from './contact/Contact';
import Contacts from './contact/ContactList';
import Case from './case/Case';
import Cases from './case/CaseList';
import Dashboard from './dashboard';
import CreateCourtCaseForm from './case/CaseForm';
import CreateContactForm from './contact/ContactForm';
import CreateContactCourtCaseForm from './ContactCourtCaseForm';

export default function Pages() {
  return (
    <Fragment>
      <Router primary={false} component={Fragment}>
        <Dashboard path="/" />
        <Cases path="/cases" />
        <Case path="/case/:courtCaseId" />
        <Contacts path="/contacts" />
        <Contact path="/contact/:contactId" />        
        <CreateContactForm path="/contact/create"/>
        <CreateCourtCaseForm path="/case/create"/>
        <CreateContactCourtCaseForm path="/case/createWithContact"/>
      </Router>
    </Fragment>
  );
}