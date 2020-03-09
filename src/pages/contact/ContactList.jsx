import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";

import '../../App.css';
import ContactTile from "../../components/contact/ContactDetails";
import Header from "../../components/header";
import Loading from "../loading";
import { GET_CONTACTS } from "../../graphQL/queries"

const Contacts = () => {
  const { data, loading, error } = useQuery(GET_CONTACTS);

  if (loading) return <Loading />;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      <Header title={"List of Contacts"} />
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