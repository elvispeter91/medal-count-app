import { renderHook } from "@testing-library/react";
import * as nextNavigation from "next/navigation";
import useQueryParam from "./useQueryParams"; // Adjust the import path
import { BtnType } from "../components/blocks/appButton/appButton";

// const setSortOptionMock = jest.fn();
jest.mock("@/store/flagStore", () => ({
  useMedalStore: {
    getState: () => ({
      setSortOption: () =>jest.fn(),
    }),
  },
}));

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

describe("useQueryParam", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls setSortOption with a valid BtnType when sort query param exists", () => {
    const sortParam: BtnType = "gold";
    const mockGet = jest.fn().mockReturnValue(sortParam);
    (nextNavigation.useSearchParams as jest.Mock).mockReturnValue({
      get: mockGet,
    });

    renderHook(() => useQueryParam());

    expect(mockGet).toHaveBeenCalledWith("sort");
  });

  it("does not call setSortOption when sort query param is absent", () => {
    const mockGet = jest.fn().mockReturnValue(null);
    (nextNavigation.useSearchParams as jest.Mock).mockReturnValue({
      get: mockGet,
    });

    renderHook(() => useQueryParam());

    expect(mockGet).toHaveBeenCalledWith("sort");
  });
});