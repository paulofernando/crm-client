import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";

import CourtCaseDetails from "../../components/case/CaseDetails";
import Header from "../../components/header";
import Loading from "../loading";
import { GET_COURT_CASE_DETAILS } from '../../graphQL/queries'

const CourtCase = ({ courtCaseId }) => {
  const { data, loading, error } = useQuery(GET_COURT_CASE_DETAILS, {
    variables: { courtCaseId }
  });

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      <Header title={"Case"} />
      <CourtCaseDetails {...data} />
    </Fragment>
  );
};

export default CourtCase;