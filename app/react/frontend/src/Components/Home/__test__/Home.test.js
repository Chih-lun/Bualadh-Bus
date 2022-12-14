import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../Home'
import * as axios from "axios";
import React from "react";
import axiosMock from "axios";

// test route planner container
describe("Route Planner", () => {

    test('Header', () => {
        render(<Home title="Route Planner"/>);
        const headingElement = screen.getByTitle("Header");
        expect(headingElement).toBeInTheDocument();
    })
    
    const mockTime = jest.fn()
    const mockLocation = jest.fn()
    const mockDestination = jest.fn()
    
    test("should take user input for route planner when submit button is clicked", async () => {
        render(
            <Home
                time = {''}
                setTime = {mockTime}
                location = {''}
                setLocation = {mockLocation}
                destination = {''}
                setDestination = {mockDestination}
            />);
        
        const month = ["January","February","March","April","May","June","July","August",
            "September","October","November","December"];
        const date = new Date();
        let m = month[date.getMonth()];
        let d = date.getDate();
        let y = date.getFullYear();
    
        const timeElement = screen.getByDisplayValue(m + " " + d + ", " + y + " 12:00 AM")
        const locationElement = screen.getByPlaceholderText(/Beginning stop ID/i)
        const destinationElement = screen.getByPlaceholderText(/Ending stop ID/i)
        const buttonElement = screen.getByRole("button", { name: /Submit/ })
    
        fireEvent.change(timeElement, { target: { value: "15:00:00" }})
        fireEvent.change(locationElement, { target: { value: "395" } })
        fireEvent.change(destinationElement, { target: { value: "4662" } })
        fireEvent.click(buttonElement)
    
        expect(timeElement.value).toBe("15:00:00");
        expect(locationElement.value).toBe("395");
        expect(destinationElement.value).toBe("4662");
    })
    
    // test prediction result exists
    test('should return a prediction to the user', async () => {
        render(<Home />);
        const weatherElement = screen.getByTestId('prediction');
        expect(weatherElement).toBeVisible();
    })
})

// test current weather container
describe("Weather", () => {
    test('should return weather information in display for user', async () => {
        render(<Home />);
        const weatherElement = screen.getByTestId("weather");
        expect(weatherElement).toBeInTheDocument();
    })
})

// test google map is visible to user
describe("Google map", () => {
    test("should render a visible Google map to user", () => {
        render(<Home />);
        const tableElement = screen.getByTestId('map')
        expect(tableElement).toBeVisible();
    })
})