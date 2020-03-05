import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import ContactDetails from "../../components/contact/contact-details";
import Header from "../../components/header";

import { CONTACT_TILE_DATA } from "./contacts";

export const GET_CONTACT_DETAILS = gql`  
    query ContactDetails($contactId: ID!) {
      contact(id: $contactId) {
        ...ContactTile
    }
  }
  ${CONTACT_TILE_DATA}
`;

const Contact = ({ contactId }) => {
    const { data, loading, error } = useQuery(GET_CONTACT_DETAILS, {
      variables: { contactId }
    });
  
    //if (loading) return <Loading />;
    if (error) return <p>ERROR: {error.message}</p>;
    if (!data) return <p>Not found</p>;

    return (
      <Fragment>
        <Header title={"Contact"}/> 
        <ContactDetails {...data} />
      </Fragment>
    );
  };
  
  export default Contact;