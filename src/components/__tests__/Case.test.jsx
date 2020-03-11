import React from "react";
import { MockedProvider } from '@apollo/react-testing';
import { act, render, screen } from '@testing-library/react';

import Case from '../../pages/case/Case';
import { GET_COURT_CASE_DETAILS } from '../../graphQL/queries'

const mocks = [
    {
        request: {
            query: GET_COURT_CASE_DETAILS,
            variables: {
                courtCaseId: 10,
            },
        },
        result: {
            data: {
                __typename: "Query",
                courtCase: {
                    id: 10,
                    title: "Title 1",
                    description: "Description 1",
                    courtDate: "2020-01-01T00:00:00.000Z",
                    value: "1000",
                    __typename: "CourtCase",
                    contacts: [{
                        id: 1,
                        firstName: "Adriano",
                        lastName: "Silva",
                        caseRole: "Judge",
                        email: "as@gmail.com",                        
                        __typename: "Contact",
                    },{
                        id: 2,
                        firstName: "Maria",
                        lastName: "Souza",
                        caseRole: "Prosecutor",
                        email: "ms@gmail.com",                        
                        __typename: "Contact",
                    },{
                        id: 3,
                        firstName: "John",
                        lastName: "Smith",
                        caseRole: "Barrister",
                        email: "js@gmail.com",                        
                        __typename: "Contact",
                    },{
                        id: 4,
                        firstName: "Bob",
                        lastName: "Lee",
                        caseRole: "Accused",
                        email: "bl@gmail.com",                        
                        __typename: "Contact",
                    }]
                },
            },
        },
    },
];

async function wait(ms = 0) {
    await act(() => {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    });
}

describe('<Case />', () => {
    it('renders and matches snapshot', async () => {
        const { container } = render(
            <MockedProvider removeTypename={true} addTypename={true} mocks={mocks}>
                <Case courtCaseId={10} />
            </MockedProvider>
        );

        expect(container).toHaveTextContent("Loading...")

        await wait();

        expect(screen.getByText("Title 1")).toBeInTheDocument()
        expect(screen.getByText("Description 1")).toBeInTheDocument()
        expect(screen.getByText("December 31st 2019")).toBeInTheDocument()
        expect(screen.getByText("$1,000")).toBeInTheDocument()

        expect(screen.getByText("Adriano Silva")).toBeInTheDocument()
        expect(screen.getByText("as@gmail.com")).toBeInTheDocument()
        expect(screen.getByText("Judge")).toBeInTheDocument()

        expect(screen.getByText("Maria Souza")).toBeInTheDocument()
        expect(screen.getByText("ms@gmail.com")).toBeInTheDocument()
        expect(screen.getByText("Prosecutor")).toBeInTheDocument()

        expect(screen.getByText("John Smith")).toBeInTheDocument()
        expect(screen.getByText("js@gmail.com")).toBeInTheDocument()
        expect(screen.getByText("Barrister")).toBeInTheDocument()

        expect(screen.getByText("Bob Lee")).toBeInTheDocument()
        expect(screen.getByText("bl@gmail.com")).toBeInTheDocument()
        expect(screen.getByText("Accused")).toBeInTheDocument()
    });
});