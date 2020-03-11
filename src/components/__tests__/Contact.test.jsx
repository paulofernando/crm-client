import React from "react";
import { MockedProvider } from '@apollo/react-testing';
import { act, render, screen } from '@testing-library/react';

import Contact from '../../pages/contact/Contact';
import { GET_CONTACT_DETAILS } from '../../graphQL/queries'

const mocks = [
    {
        request: {
            query: GET_CONTACT_DETAILS,
            variables: {
                contactId: 1,
            },
        },
        result: {
            data: {
                __typename: "Query",
                contact: {
                    id: 10,
                    firstName: "Adriano",
                    lastName: "Silva",
                    caseRole: "Judge",
                    email: "as@gmail.com",
                    __typename: "Contact",
                    courtCase: {
                        id: 1,
                        title: "Title 1",
                        description: "Description 1",
                        courtDate: "2020-01-01T00:00:00.000Z",
                        value: "1000",
                        __typename: "CourtCase",
                    }
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

describe('<Contact />', () => {
    it('renders and matches snapshot', async () => {
        const { container } = render(
            <MockedProvider addTypename={true} mocks={mocks}>
                <Contact contactId={1} />
            </MockedProvider>
        );

        expect(container).toHaveTextContent("Loading...")

        await wait();
    
        expect(screen.getByText("Adriano Silva")).toBeInTheDocument()
        expect(screen.getByText("as@gmail.com")).toBeInTheDocument()
        expect(screen.getByText("Judge")).toBeInTheDocument()
        expect(screen.getByText("Case #1")).toBeInTheDocument()
    });
});