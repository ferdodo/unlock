import { Puzzle } from "unlock/interfaces/puzzle";
import { generate_puzzle_json } from "puzzle-generator/pkg/unlock_puzzle_generator";

export function generatePuzzle(): Puzzle {
	return JSON.parse(generate_puzzle_json()) as Puzzle;	
}
