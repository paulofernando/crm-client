import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import '../../App.css';
import CourtCaseTile from "../../components/case/CaseTile";
import Header from "../../components/header";
import Loading from "../loading";

export const COURT_CASE_TILE_DATA = gql`
  fragment CourtCaseTile on CourtCase {
    id
    title
    description
    courtDate
    value
    contacts {
      id
      firstName
      lastName
      caseRole
      email
    }
  }
`;

const GET_COURT_CASES = gql`
    query {
      courtCases {
        ...CourtCaseTile
      }
    }
    ${COURT_CASE_TILE_DATA}
`;

const CourtCases = () => {
    const { data, loading, error } = useQuery(GET_COURT_CASES);
  
    if (loading) return <Loading />;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;
  
    return (
      <Fragment>
        <Header title={"List of Cases"}/>        
        <div className="courtCaseContainer">          
            {data.courtCases &&
              data.courtCases.map(courtCase => (                
                  <CourtCaseTile key={courtCase.id} courtCase={courtCase} />
              ))}
          </div>        
      </Fragment>
    );
  };
  
  export default CourtCases;