import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { NotFound } from "../pages/not-found/NotFound.tsx";

describe("NotFound component", () => {
  it("renders the main element with correct class", () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    const mainElement = container.querySelector("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass("main");
  });

  it("displays the correct title text", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    const titleElement = screen.getByText("This is");
    expect(titleElement).toBeInTheDocument();
  });

  it("displays the 404 error", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    const errorElement = screen.getByText("404");
    expect(errorElement).toBeInTheDocument();
  });

  it("has a link to return to the main page", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    const linkElement = screen.getByText("Return on other side");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
