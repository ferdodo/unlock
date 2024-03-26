import { test, expect } from "vitest";
import { isBitMoveLegal } from "./is-bit-move-legal";
import { Puzzle } from "./types/puzzle";
import { Bit } from "./types/bit";

test("Shall be legal to move unregistered block into the puzzle", function() {
	const puzzle: Puzzle = {
		latch: {
			block: {
				x: 0,
				y: 2,
				h: 1,
				w: 2
			}
		},
		bits: [{
			id: 1,
			block: {
				x: 2,
				y: 5,
				w: 1,
				h: 2
			}
		}],
		block: {
			x: 0,
			y: 0,
			h: 6,
			w: 6
		}
	};

	const bit: Bit = {
		id: 0,
		block: {
			x: 2,
			y: 0,
			w: 1,
			h: 2
		}
	};

	const legal = isBitMoveLegal(puzzle, bit);
	expect(legal).toBeTruthy();
});

test("Shall be illegal to move outside the puzzle", function() {
	const puzzle: Puzzle = {
		latch: {
			block: {
				x: 0,
				y: 2,
				h: 1,
				w: 2
			}
		},
		bits: [],
		block: {
			x: 0,
			y: 0,
			h: 6,
			w: 6
		}
	};

	const bit: Bit = {
		id: 0,
		block: {
			x: 20,
			y: 0,
			w: 1,
			h: 2
		}
	};

	const legal = isBitMoveLegal(puzzle, bit);
	expect(legal).toBeFalsy();
});

test("Shall be illegal to collide another bit", function() {
	const puzzle: Puzzle = {
		latch: {
			block: {
				x: 0,
				y: 2,
				h: 1,
				w: 2
			}
		},
		bits: [{
			id: 1,
			block: {
				x: 2,
				y: 0,
				w: 1,
				h: 2
			}
		}],
		block: {
			x: 0,
			y: 0,
			h: 6,
			w: 6
		}
	};

	const bit: Bit = {
		id: 0,
		block: {
			x: 2,
			y: 0,
			w: 1,
			h: 2
		}
	};

	const legal = isBitMoveLegal(puzzle, bit);
	expect(legal).toBeFalsy();
});

test("Shall be illegal to collide latch", function() {
	const puzzle: Puzzle = {
		latch: {
			block: {
				x: 0,
				y: 2,
				h: 1,
				w: 2
			}
		},
		bits: [],
		block: {
			x: 0,
			y: 0,
			h: 6,
			w: 6
		}
	};

	const bit: Bit = {
		id: 0,
		block: {
			x: 0,
			y: 2,
			w: 1,
			h: 2
		}
	};

	const legal = isBitMoveLegal(puzzle, bit);
	expect(legal).toBeFalsy();
});

test("Shall be legal for block to collides its old position", function() {
	const puzzle: Puzzle = {
		latch: {
			block: {
				x: 0,
				y: 2,
				h: 1,
				w: 2
			}
		},
		bits: [{
			id: 0,
			block: {
				x: 1,
				y: 0,
				w: 2,
				h: 1
			}
		}, {
			id: 1,
			block: {
				x: 2,
				y: 5,
				w: 1,
				h: 2
			}
		}],
		block: {
			x: 0,
			y: 0,
			h: 6,
			w: 6
		}
	};

	const bit: Bit = {
		id: 0,
		block: {
			x: 2,
			y: 0,
			w: 2,
			h: 1
		}
	};

	const legal = isBitMoveLegal(puzzle, bit);
	expect(legal).toBeTruthy();
});
