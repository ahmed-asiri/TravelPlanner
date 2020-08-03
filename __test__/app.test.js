import {isEmpty} from "../src/client/js/validate";
import {dateDimension} from "../src/client/js/validate";
import {pastDay} from "../src/client/js/validate";


test("check if the String is Empty or not", () => {
    expect(isEmpty("")).toBe(true);
});

test("check if the date dimension is correct", () => {
    expect(dateDimension(new Date("10-10-2020"), new Date("12-10-2020"))).toBe(true);
});

test("check if the entered date is before the current date or not", () => {
    expect(pastDay(new Date("6-5-2020"))).toBe(true);
});