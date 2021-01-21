import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';
import ResetPassword from '../../pages/resetPassword';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    useLocation: () => ({
      search: '',
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe("ResetPassword Page", () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedAddToast.mockClear();
  });

  it("should be able to reset the password", async () => {
    
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    apiMock.onPost('/password/reset').replyOnce(200);
    jest
      .spyOn(URLSearchParams.prototype, 'get')
      .mockImplementationOnce(() => 'token-jwt');

    const newPasswordField = getByPlaceholderText("New password");
    const newPasswordConfirmationField = getByPlaceholderText(
      "New password confirmation"
    );
    const buttonElement = getByText("Reset password");

    fireEvent.change(newPasswordField, { target: { value: "123456" } });
    fireEvent.change(newPasswordConfirmationField, {
      target: { value: "123456" },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it("should not be able to reset the password with invalid confirmation password", async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const newPasswordField = getByPlaceholderText("New password");
    const newPasswordConfirmationField = getByPlaceholderText(
      "New password confirmation"
    );
    const buttonElement = getByText("Reset password");

    fireEvent.change(newPasswordField, { target: { value: "123456" } });
    fireEvent.change(newPasswordConfirmationField, {
      target: { value: "invalid-password" },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it("should not be able to reset the password without a token", async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const newPasswordField = getByPlaceholderText("New password");
    const newPasswordConfirmationField = getByPlaceholderText(
      "New password confirmation"
    );
    const buttonElement = getByText("Reset password");

    fireEvent.change(newPasswordField, { target: { value: "123456" } });
    fireEvent.change(newPasswordConfirmationField, {
      target: { value: "123456" },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });
});
