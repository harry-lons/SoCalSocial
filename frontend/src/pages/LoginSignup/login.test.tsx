import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from '../../App';
import LoginSignup from './LoginSignup';

describe('Login', () => {
    test('Test login page render', () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <App />
            </MemoryRouter>
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
            <MemoryRouter initialEntries={['/login']}>
                <App />
            </MemoryRouter>
        );

        // Enter 'username1@example.com' as email
        fireEvent.change(screen.getByTestId('emailInput').querySelector('input')!, {
            target: { value: 'username1@example.com' },
        });

        // Enter 'password' as password
        fireEvent.change(screen.getByTestId('passwordInput').querySelector('input')!, {
            target: { value: 'password' },
        });

        // Click the login button
        fireEvent.click(screen.getByRole('button', { name: /LOG IN/i }));

        // Assert that navigation to the /event page happens upon successful login
        await waitFor(() => {

            // Check for the existence of navbar
            const NavbarTexts = screen.getAllByText('SoCalSocial');
            expect(NavbarTexts).toHaveLength(2);
            NavbarTexts.forEach(text => expect(text).toBeInTheDocument());

            // // Check for the existence of RSVP Events checkbox filter
            // expect(screen.getByText('RSVP Events')).toBeInTheDocument();

            // // Check for the existence of Followed Events checkbox filter
            // expect(screen.getByText('Followed Clubs')).toBeInTheDocument();

            const HomepageWelcomeText = screen.getByText(/SoCalSocial: Your Personalized Hub for UCSD Events/i);
            expect(HomepageWelcomeText).toBeInTheDocument();

            // Check for any other unique elements on the homepage
            expect(screen.getByText('Start Demo')).toBeInTheDocument();

        });
    });

    // test('Simulate successful login', async () => {
    //     render(
    //         <MemoryRouter initialEntries={['/login']}>
    //             <App />
    //         </MemoryRouter>
    //     );
    
    //     // Enter 'username1@example.com' as email
    //     fireEvent.change(screen.getByTestId('emailInput').querySelector('input')!, {
    //         target: { value: 'username1@example.com' },
    //     });
    
    //     // Enter 'password' as password
    //     fireEvent.change(screen.getByTestId('passwordInput').querySelector('input')!, {
    //         target: { value: 'password' },
    //     });
    
    //     // Click the login button
    //     fireEvent.click(screen.getByRole('button', { name: /LOG IN/i }));
    
    //     // Assert navigation based on user type
    //     await waitFor(() => {
    //         // Determine user type 
    //         const isClubSide = true; // Replace this with the actual condition that differentiates user types
    
    //         if (isClubSide) {
    //             // Check for the Event Page elements
    //             const NavbarTexts = screen.getAllByText('SoCalSocial');
    //             expect(NavbarTexts).toHaveLength(2);
    //             NavbarTexts.forEach(text => expect(text).toBeInTheDocument());
    
    //             expect(screen.getByText('RSVP Events')).toBeInTheDocument();
    //             expect(screen.getByText('Followed Clubs')).toBeInTheDocument();
    //         } 
            
    //         else {
    //             // Check for the Homepage elements
    //             const HomepageWelcomeText = screen.getByText(/SoCalSocial: Your Personalized Hub for UCSD Events/i);
    //             expect(HomepageWelcomeText).toBeInTheDocument();
    
    //             // Check for any other unique elements on the homepage
    //             expect(screen.getByText('Star Demo')).toBeInTheDocument();
    //         }
    //     });
    // });
    
})

