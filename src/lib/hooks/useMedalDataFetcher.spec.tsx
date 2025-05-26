import { renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { country2FlagMapper, getSortedMedalsArray } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useMedalDataFetcher from "./useMedalDataFetcher";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const setMedalDataMock = jest.fn();
jest.mock("@/store/flagStore", () => ({
  useMedalStore: {
    getState: jest.fn(() => ({
      setMedalData: setMedalDataMock,
    })),
  },
}));

jest.mock("@/lib/utils", () => ({
  country2FlagMapper: jest.fn(),
  getSortedMedalsArray: jest.fn(),
}));

describe("useMedalDataFetcher", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global.fetch = undefined as any;
  });

  it("fetches medal data successfully and updates store", async () => {
    const mockData = [
      { code: "USA", gold: 9, silver: 7, bronze: 12 },
    ];
    const mappedData = [
      { code: "USA", gold: 9, silver: 7, bronze: 12, total: 28, position: "0 -22px" },
      { code: "CAD", gold: 5, silver: 5, bronze: 5, total: 15, position: "0 -34px" },
    ];
    const sortedData = [...mappedData];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;

    (country2FlagMapper as jest.Mock).mockReturnValue(mappedData);
    (getSortedMedalsArray as jest.Mock).mockReturnValue(sortedData);

    const { result } = renderHook(() => useMedalDataFetcher());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(country2FlagMapper).toHaveBeenCalledWith(mockData);
    expect(getSortedMedalsArray).toHaveBeenCalledWith(mappedData);
    expect(setMedalDataMock).toHaveBeenCalledWith(sortedData);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("handles fetch error and redirects to /error", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network Error"))) as jest.Mock;

    const { result } = renderHook(() => useMedalDataFetcher());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe("Network Error");
    expect(mockPush).toHaveBeenCalledWith("/error");
  });

  it("handles non-ok response and redirects to /error", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: false, status: 500 })
    ) as jest.Mock;

    const { result } = renderHook(() => useMedalDataFetcher());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe("Server error: 500");
    expect(mockPush).toHaveBeenCalledWith("/error");
  });
});