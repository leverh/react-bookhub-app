import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider } from '../../contexts/CurrentUserContext';
import NavBar from '../NavBar'
import axios from 'axios';

jest.mock('axios');

describe('NavBar Component', () => {
  test('renders NavBar component', () => {
    render(
      <Router>
        <CurrentUserProvider>
          <NavBar />
        </CurrentUserProvider>
      </Router>
    );

    expect(screen.getByAltText('BookHub logo')).toBeInTheDocument();
  });

  test('renders Sign in and Sign up links when user is logged out', () => {
    render(
      <Router>
        <CurrentUserProvider>
          <NavBar />
        </CurrentUserProvider>
      </Router>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  test('renders Sign out and Profile links when user is logged in', () => {
    render(
      <Router>
        <CurrentUserProvider value={{ currentUser: { profile_id: 1 } }}>
          <NavBar />
        </CurrentUserProvider>
      </Router>
    );

    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  test('calls handleSignOut on Sign out click', () => {
    axios.post.mockResolvedValue({});
    const { getByText } = render(
      <Router>
        <CurrentUserProvider value={{ currentUser: { profile_id: 1 }, setCurrentUser: jest.fn() }}>
          <NavBar />
        </CurrentUserProvider>
      </Router>
    );

    fireEvent.click(getByText('Sign out'));

    expect(axios.post).toHaveBeenCalledWith('dj-rest-auth/logout/');
  });
});
