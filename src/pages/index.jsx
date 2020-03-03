import React, { Fragment } from 'react';

import Contact from './contact';
import Contacts from './contacts';
import CourtCases from './courtCases';
//import { Footer, PageContainer } from '../components/';

export default function Pages() {
  return (
    <Fragment>
        {/* <Contacts path="/" /> */}
        <CourtCases path="/" />
    </Fragment>
  );
}