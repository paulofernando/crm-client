import React from "react";
import { MockedProvider } from '@apollo/react-testing';
import renderer from 'react-test-renderer';

import { GET_CONTACT_DETAILS, Contact } from '../../pages/contact/Contact';

// const mocks = [
//   {
//     request: {
//       query: GET_CONTACT_DETAILS,
//       variables: {
//         contactId: 1,
//       },
//     },
//     result: {
//       data: {
//         contact: { 
//             firstName: "Adriano",
//             lastName: "Silva",
//             caseRole: "Judge",
//             email: "as@gmail.com",
//             courtCaseId: 1
//         },
//       },
//     },
//   },
// ];

// it('renders case without error', () => {
//   renderer.create(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <Contact contactId="1" match={
//           {
//             request: {
//               query: GET_CONTACT_DETAILS,
//               variables: {
//                 contactId: 1,
//               },
//             },
//             result: {
//               data: {
//                 contact: { 
//                     firstName: "Adriano",
//                     lastName: "Silva",
//                     caseRole: "Judge",
//                     email: "as@gmail.com",
//                     courtCaseId: 1
//                 },
//               },
//             },
//           }
//       }/>
//     </MockedProvider>
//   );
// });