import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import ContactTile from "../components/ContactTile";

export const CONTACT_TILE_DATA = gql`
  fragment ContactTile on Contact {
    id,
    firstName,
    lastName,
    caseRole,
    email,
    courtCase {
      id
      title
      description
      courtDate
      value
    }
  }
`;

const GET_CONTACTS = gql`
    query {
      contacts {
        ...ContactTile
      }
    }
    ${CONTACT_TILE_DATA}
`;

const Contacts = () => {
    const { data, loading, error } = useQuery(GET_CONTACTS);
  
    //if (loading) return <Loading />;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;
  
    return (
      <Fragment>        
        {data.contacts &&
          data.contacts.map(contact => (
            <ContactTile key={contact.id} contact={contact} />
          ))}
      </Fragment>
    );
  };
  
  export default Contacts;