import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import CourtCaseDetails from "../../components/case/court-case-details";
import Header from "../../components/header";

import { COURT_CASE_TILE_DATA } from "./court-cases";

export const GET_COURT_CASE_DETAILS = gql`  
    query CourtCaseDetails($courtCaseId: ID!) {
      courtCase(id: $courtCaseId) {
        ...CourtCaseTile
    }
  }
  ${COURT_CASE_TILE_DATA}
`;

const CourtCase = ({ courtCaseId }) => {
    const { data, loading, error } = useQuery(GET_COURT_CASE_DETAILS, {
      variables: { courtCaseId }
    });
  
    //if (loading) return <Loading />;
    if (error) return <p>ERROR: {error.message}</p>;
    if (!data) return <p>Not found</p>;

    return (
      <Fragment>
        <Header title={"Case"}/> 
        <CourtCaseDetails {...data} />
      </Fragment>
    );
  };
  
  export default CourtCase;