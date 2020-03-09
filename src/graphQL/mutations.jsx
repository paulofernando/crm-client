import gql from "graphql-tag";

export const CREATE_CONTACT = gql`
  mutation CreateContact(
    $firstName: String!
    $lastName: String!
    $caseRole: [Role]!
    $email: String!
    $courtCaseId: [ID]
  ) {
    createContact(
      input: {
        firstName: $firstName
        lastName: $lastName
        caseRole: $caseRole
        email: $email
        courtCaseId: $courtCaseId
      }
    ) {
      contact {
        id
        firstName
        lastName
        caseRole
        email
      }
      errors
    }
  }
`;

export const CREATE_COURT_CASE = gql`
  mutation CreateCourtCase(
    $title: String!
    $description: String!
    $value: Float!
    $courtDate: String!
  ) {
    createCourtCase(
      input: {
        title: $title
        description: $description
        value: $value
        courtDate: $courtDate
      }
    ) {
      courtCase {
        id
        title
        description
        value
        courtDate
      }
      errors
    }
  }
`;

export const CREATE_CONTACT_COURT_CASE = gql`
  mutation CreateContactCourtCase(
    $title: String!
    $description: String!
    $value: Float!
    $courtDate: String!
    $firstName: String!
    $lastName: String!
    $caseRole: [Role]!
    $email: String!
  ) {
    createContactCourtCase(
      input: {
        title: $title
        description: $description
        value: $value
        courtDate: $courtDate
        firstName: $firstName
        lastName: $lastName
        caseRole: $caseRole
        email: $email
      }
    ) {
      contact {
        id
      }
      courtCase {
        id
      }
      errors
    }
  }
`;

export const UNASSIGN_CONTACT_CASES = gql`
  mutation UnassignContact($contactId: ID!) {
    updateContact(input: { id: $contactId, courtCaseId: null }) {
      contact {
        id
      }
      errors
    }
  }
`;

export const ASSIGN_CONTACT_CASES = gql`
  mutation AssignContact($contactId: ID!, $courtCaseId: ID!) {
    updateContact(input: { id: $contactId, courtCaseId: $courtCaseId }) {
      contact {
        id
        courtCase {
          id
        }
      }
      errors
    }
  }
`;