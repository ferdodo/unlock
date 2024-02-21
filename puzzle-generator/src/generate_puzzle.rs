use super::generate_random_number::generate_random_number;
use super::block::Block;
use super::is_bit_move_legal::is_bit_move_legal;
use super::is_latch_move_legal::is_latch_move_legal;
use super::puzzle::Puzzle;
use super::latch::Latch;
use super::there_is_a_big_vertical_block_in_the_upper_right::there_is_a_big_vertical_block_in_the_upper_right;
use super::there_is_few_empty_slots::there_is_few_empty_slots;
use super::generate_bits::generate_bits;
use super::there_is_a_big_vertical_block::there_is_a_big_vertical_block;
use super::there_is_a_big_horizontal_block_in_the_bottom_right::there_is_a_big_horizontal_block_in_the_bottom_right;
use super::there_is_a_big_horizontal_block::there_is_a_big_horizontal_block;
use std::time::{Instant, Duration};

pub fn generate_puzzle() -> Option<Puzzle> {
    let mut puzzle: Puzzle = Puzzle {
        block: Block { x: 0, y: 0, w: 6, h: 6 },
        latch: Latch { block: Block { x: 0, y: 2, w: 2, h: 1 } },
        bits: vec![],
    };

    puzzle.bits = generate_bits(&puzzle);
    let mut bit_moved: std::collections::HashSet<usize> = std::collections::HashSet::new();
	let mut moves: u32 = 0;

	if !there_is_few_empty_slots(&puzzle) {
		return None;
	}

	if !there_is_a_big_vertical_block(&puzzle) {
		return None;
	}
   
	if !there_is_a_big_horizontal_block(&puzzle) {
		return None;
	}

    loop {

        if puzzle_is_good(&puzzle, &bit_moved) {
            return Some(puzzle);
        }

        if moves > 5000 {
            return None;
        }

        let move_bit = generate_random_number(0, 100) < 90;

        if move_bit {
            let bit_index = generate_random_number(0, puzzle.bits.len() as u32) as usize;
            let bit = &puzzle.bits[bit_index];
            let move_direction = generate_random_number(0, 100) > 50;
            let move_sign = if generate_random_number(0, 100) > 50 { 1 } else { -1 };

            let moved_block = Block {
                x: bit.block.x + if move_direction { move_sign } else { 0 },
                y: bit.block.y + if move_direction { 0 } else { move_sign },
                w: bit.block.w,
                h: bit.block.h,
            };

            if is_bit_move_legal(&puzzle, bit.id, &moved_block) {
                moves = moves + 1;
                bit_moved.insert(bit.id as usize);
                puzzle.bits[bit_index].block = moved_block;
            }
        } else {
            let direction = generate_random_number(0, 100) < 10;
            let move_latch_event_x = puzzle.latch.block.x + if direction { 1 } else { -1 };

            let moved_block = Block {
                x: puzzle.latch.block.x + if direction { 1 } else { -1 },
                y: puzzle.latch.block.y,
                w: puzzle.latch.block.w,
                h: puzzle.latch.block.h,
            };

            if is_latch_move_legal(&puzzle, &moved_block) {
                moves = moves + 1;
                puzzle.latch.block.x = move_latch_event_x;
            }
        }
    }

    Some(puzzle);
}

fn puzzle_is_good(puzzle: &Puzzle, bit_moved: &std::collections::HashSet<usize>) -> bool {
    puzzle.latch.block.x == 0
        && there_is_a_big_vertical_block_in_the_upper_right(&puzzle)
        && there_is_a_big_horizontal_block_in_the_bottom_right(&puzzle)
        && bit_moved.len() == puzzle.bits.len()
}


#[cfg(test)]
mod tests {
    use super::*;

	#[test]
	fn test_generate_puzzle() {
		for i in 0..20 {
		    let start_time = Instant::now();
		    let mut attempts = 0;
		    let mut puzzle = None;

		    while puzzle.is_none() && attempts < 10000 {
		        puzzle = generate_puzzle();
		        attempts += 1;
		    }

		    assert!(puzzle.is_some());
		    let puzzle = puzzle.unwrap();
		    assert_eq!(puzzle.block.w, 6);
		    assert_eq!(puzzle.block.h, 6);
		    assert_eq!(puzzle.latch.block.w, 2);
		    assert_eq!(puzzle.latch.block.h, 1);
		    let elapsed_time = start_time.elapsed();
		    let max_duration = Duration::from_millis(20000);
		    assert!(elapsed_time < max_duration, "Exceeded maximal duration for generating a puzzle !");
		}
	}
}
