import AppButton from "@/lib/components/blocks/appButton/appButton";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("renders the AppButton and handles click", () => {
  const handleClick = jest.fn();
  render(<AppButton type="gold" onClick={handleClick} selectedType={null} />);

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();

  button.click();
  expect(handleClick).toHaveBeenCalledWith("gold");
});
