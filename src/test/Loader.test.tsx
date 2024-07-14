import { render } from "@testing-library/react";
import { Loader } from "../components/loader/Loader.tsx";
import styles from "../components/loader/styles.module.scss";
import "@testing-library/jest-dom";

describe("Loader Component", () => {
  it("renders main element with correct class", () => {
    const { container } = render(<Loader />);
    const mainElement = container.querySelector("main");

    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass("main");
  });

  it("renders the weapon class correctly", () => {
    const { container } = render(<Loader />);
    const weaponElement = container.querySelector(`.${styles.weapon}`);
    expect(weaponElement).toBeInTheDocument();
  });
});
