mod generate_random_number;
mod generate_puzzle;
mod latch;
mod bit;
mod block;
mod puzzle;
mod generate_block;
mod generate_id;
mod block_collides;
mod block_includes;
mod generate_bits;
mod there_is_a_big_vertical_block_in_the_upper_right;
mod there_is_few_empty_slots;
mod is_latch_move_legal;
mod is_bit_move_legal;
mod get_seed;
mod there_is_a_big_vertical_block;
mod there_is_a_big_horizontal_block_in_the_bottom_right;
mod there_is_a_big_horizontal_block;

use serde::{Serialize, Deserialize};
use serde_json;
use generate_puzzle::generate_puzzle;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn generate_puzzle_json() -> String {
    let mut puzzle = None;

    while puzzle.is_none() {
        puzzle = generate_puzzle();
    }

    let mut puzzle_json = serde_json::to_string(&puzzle).unwrap();
    puzzle_json
}
