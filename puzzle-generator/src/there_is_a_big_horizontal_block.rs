use super::puzzle::Puzzle;
use super::latch::Latch;
use super::bit::Bit;
use super::block::Block;

pub fn there_is_a_big_horizontal_block(puzzle: &Puzzle) -> bool {
	for bit in &puzzle.bits {
		if bit.block.w > 2 {
			return true;
		}
	}

	return false;
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_there_is_a_big_horizontal_block() {
        let puzzle = Puzzle {
            latch: Latch { block: Block { x: 0, y: 2, w: 2, h: 1 } },
            bits: vec![
                Bit { id: 0, block: Block { x: 6, y: 0, w: 2, h: 3 } },
                Bit { id: 1, block: Block { x: 3, y: 5, w: 3, h: 2 } },
            ],
            block: Block { x: 0, y: 0, w: 6, h: 6 },
        };

        assert_eq!(there_is_a_big_horizontal_block(&puzzle), true);
    }
}
