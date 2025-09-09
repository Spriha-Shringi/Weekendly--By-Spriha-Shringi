import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSchedule } from "../store";


describe("schedule store", () => {
it("adds and removes items", () => {
const { result } = renderHook(() => useSchedule());
const a = result.current.activities[0];


act(() => result.current.add("Saturday", a));
expect(result.current.schedule["Saturday"].length).toBe(1);


const id = result.current.schedule["Saturday"][0].instanceId;
act(() => result.current.remove("Saturday", id));
expect(result.current.schedule["Saturday"].length).toBe(0);
});
});