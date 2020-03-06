import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import 'bootstrap/dist/css/bootstrap.min.css';

import Contact from './contact/contact';
import Contacts from './contact/contacts';
import CourtCase from './case/court-case';
import CourtCases from './case/court-cases';
import Dashboard from './dashboard';
import CreateCourtCaseForm from './case/court-case-form';
import CreateContactForm from './contact/contact-form';
//import { Footer, PageContainer } from '../components/';

export default function Pages() {
  return (
    <Fragment>
      <Router primary={false} component={Fragment}>
        <Dashboard path="/" />
        <CourtCases path="/cases" />
        <CourtCase path="/case/:courtCaseId" />
        <Contacts path="/contacts" />
        <Contact path="/contact/:contactId" />        
        <CreateContactForm path="/contact/create"/>
        <CreateCourtCaseForm path="/case/create"/>
      </Router>
    </Fragment>
  );
}