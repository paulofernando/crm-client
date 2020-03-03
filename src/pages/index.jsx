import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Contact from './contact';
import Contacts from './contacts';
import CourtCases from './courtCases';
//import { Footer, PageContainer } from '../components/';

export default function Pages() {
  return (
    <Fragment>
      <Router primary={false} component={Fragment}>
        <CourtCases path="/" />
        <Contacts path="/contacts" />
      </Router>
    </Fragment>
  );
}