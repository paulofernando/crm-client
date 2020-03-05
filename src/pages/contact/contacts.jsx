import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import '../../App.css';

import ContactTile from "../../components/contact/contact-details";
import Header from "../../components/header";

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
        <Header title={"List of Contacts"}/> 
        <div className="cardContainer">          
            {data.contacts &&
              data.contacts.map(contact => (                
                  <ContactTile key={contact.id} contact={contact} />
              ))}
          </div>        
      </Fragment>
    );
  };
  
  export default Contacts;