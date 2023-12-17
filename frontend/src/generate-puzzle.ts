import { Puzzle } from "./puzzle";
import { generate_puzzle_json } from "wasm/pkg/unlock_puzzle_generator";

export function generatePuzzle(): Puzzle {
	return JSON.parse(generate_puzzle_json()) as Puzzle;	
}
