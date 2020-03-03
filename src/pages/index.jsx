import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Contact from './contact';
import Contacts from './contacts';
import CourtCases from './courtCases';
import Dashboard from './dashboard';
//import { Footer, PageContainer } from '../components/';

export default function Pages() {
  return (
    <Fragment>
      <Router primary={false} component={Fragment}>
        <Dashboard path="/" />
        <CourtCases path="/cases" />
        <Contacts path="/contacts" />
        <Contact path="/contact/:contactId" />
      </Router>
    </Fragment>
  );
}