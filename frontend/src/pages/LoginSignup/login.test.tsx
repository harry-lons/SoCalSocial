import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

describe('Login', () => {
    test('Test login page render', () => {
        render(
            <App />
        );

        // Check that "LOG IN" is on the page twice 
        const loginTexts = screen.getAllByText(/LOG IN/i);
        expect(loginTexts).toHaveLength(2);
        loginTexts.forEach(text => expect(text).toBeInTheDocument());

        // Check that the email and password inputs show up
        // Check for the presence of Email field
        expect(screen.getByText('Email')).toBeInTheDocument();

        // Check for the presence of Password field
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

        // Check for existence of log in button
        expect(screen.getByRole('button', { name: /LOG IN/i })).toBeInTheDocument();
    });

    test('Simulate successful login', async () => {
        render(
            <App />
        );

        // Enter 'username1' as username
        fireEvent.change(screen.getByTestId('emailInput').querySelector('input')!, {
            target: { value: 'username1' },
        });

        // Enter 'password' as password
        fireEvent.change(screen.getByTestId('passwordInput').querySelector('input')!, {
            target: { value: 'password' },
        });

        // Click the login button
        fireEvent.click(screen.getByRole('button', { name: /LOG IN/i }));

        // Assert that navigation to the /events page happens upon successful login
        await waitFor(() => {
            expect(screen.getByText(/Events/i)).toBeInTheDocument();
        });
    });
})

