import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";

import '../../App.css';
import CourtCaseTile from "../../components/case/CaseTile";
import Header from "../../components/header";
import Loading from "../loading";
import { GET_COURT_CASES } from "../../graphQL/queries"

const CourtCases = () => {
  const { data, loading, error } = useQuery(GET_COURT_CASES);

  if (loading) return <Loading />;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      <Header title={"List of Cases"} />
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