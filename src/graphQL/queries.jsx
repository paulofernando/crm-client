import gql from "graphql-tag";

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

export const CONTACT_TILE_DATA = gql`
  fragment ContactTile on Contact {
    id
    firstName
    lastName
    caseRole
    email
    courtCase {
      id
      title
      description
      courtDate
      value
    }
  }
`;

export const GET_CONTACTS = gql`
    query {
      contacts {
        ...ContactTile
      }
    }
    ${CONTACT_TILE_DATA}
`;

export const GET_COURT_CASES = gql`
    query {
      courtCases {
        ...CourtCaseTile
      }
    }
    ${COURT_CASE_TILE_DATA}
`;

export const GET_COURT_CASE_DETAILS = gql`  
    query CourtCaseDetails($courtCaseId: ID!) {
      courtCase(id: $courtCaseId) {
        ...CourtCaseTile
    }
  }
  ${COURT_CASE_TILE_DATA}
`;

export const GET_CONTACT_DETAILS = gql`  
    query ContactDetails($contactId: ID!) {
      contact(id: $contactId) {
        ...ContactTile
    }
  }
  ${CONTACT_TILE_DATA}
`;

export const GET_CASES_TITLES = gql`
  query {
    courtCases {
      id
      title
      contacts {
        caseRole
      }
    }
  }
`;
