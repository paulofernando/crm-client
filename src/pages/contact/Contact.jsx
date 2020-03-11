import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";

import ContactDetails from "../../components/contact/ContactDetails";
import Header from "../../components/Header";
import Loading from "../Loading";
import { GET_CONTACT_DETAILS } from "../../graphQL/queries"

const Contact = ({ contactId }) => {
    const { data, loading, error } = useQuery(GET_CONTACT_DETAILS, {
      variables: { contactId }
    });
  
    if (loading) return <Loading />;
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