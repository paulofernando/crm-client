import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import ContactTile from "../components/ContactTile";

import { CONTACT_TILE_DATA } from "./contacts";

export const GET_CONTACT_DETAILS = gql`
  query {
    contact(id: 10) {
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
        <ContactTile {...data.contact} />
      </Fragment>
    );
  };
  
  export default Contact;