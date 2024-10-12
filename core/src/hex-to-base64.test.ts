import { test, expect } from "vitest";
import { hexToBase64 } from ".";

test("should convest hex string to base64 strings", function() {
	const result = hexToBase64("AAAA");
	expect(result).toEqual("qqo=");
});
