/** @format */
import { myFunction } from "../src/lib";
describe("A two number", () => {
    describe("if two argument passes", () => {
        test("should return success", async () => {
            expect(myFunction(1, 2)).toBe(3);
        });
    });
    describe("no argument passes", () => {
        test("should return success", async () => {
            expect(myFunction(3, 3)).toBe(6);
        });
    });
});
