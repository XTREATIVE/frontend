import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import LoginScreen from "../src/screens/LoginScreen"; // Adjust the path based on your project structure
import { NavigationContainer } from "@react-navigation/native";

describe("LoginScreen Tests", () => {
  it("renders all input fields and buttons", () => {
    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
    );

    expect(getByText("Sign In")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByText("Forgot Password?")).toBeTruthy();
  });

  it("shows an error message when trying to submit an empty form", async () => {
    const { getByText } = render(
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
    );

    fireEvent.press(getByText("Sign In"));

    await waitFor(() => {
      expect(getByText("Email is required")).toBeTruthy();
      expect(getByText("Password is required")).toBeTruthy();
    });
  });

  it("shows an error when password is too short", async () => {
    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
    );

    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "123"); // Too short
    fireEvent.press(getByText("Sign In"));

    await waitFor(() => {
      expect(getByText("Password must be at least 6 characters")).toBeTruthy();
    });
  });

  it("displays a loading indicator when logging in", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
    );

    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    fireEvent.press(getByText("Sign In"));

    await waitFor(() => {
      expect(getByTestId("loading-indicator")).toBeTruthy();
    });
  });

  it("navigates to Admin Dashboard after successful login", async () => {
    const mockNavigation = { navigate: jest.fn() };

    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <LoginScreen navigation={mockNavigation} />
      </NavigationContainer>
    );

    fireEvent.changeText(getByPlaceholderText("Email"), "admin@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    fireEvent.press(getByText("Sign In"));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith("AdminDashboard");
    });
  });
});
