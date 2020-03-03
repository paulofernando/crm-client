import React, { Fragment } from 'react';

import Contact from './contact';
import Contacts from './contacts';
//import { Footer, PageContainer } from '../components/';

export default function Pages() {
  return (
    <Fragment>
        <Contacts path="/" />
    </Fragment>
  );
}