use super::block::Block;
use super::puzzle::Puzzle;
use super::latch::Latch;
use super::bit::Bit;
use super::block_includes::block_includes;
use super::block_collides::block_collides;

pub fn is_latch_move_legal(puzzle: &Puzzle, movedBlock: &Block) -> bool {
	for bit in &puzzle.bits {
		if block_collides(&bit.block, &movedBlock) {
			return false;
		}
	}

	if !block_includes(&puzzle.block, movedBlock) {
		return false;
	}

	return true;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_latch_move_legal() {
        let puzzle = Puzzle {
            bits: vec![
                Bit { id: 0, block: Block { x: 0, y: 0, w: 1, h: 1 } },
                Bit { id: 1, block: Block { x: 2, y: 0, w: 2, h: 2 } },
            ],
            block: Block { x: 0, y: 0, w: 6, h: 6 },
            latch: Latch { block: Block { x: 0, y: 2, w: 2, h: 1 } },
        };

        let moved_block = Block { x: 1, y: 2, w: 2, h: 1 };

        assert_eq!(is_latch_move_legal(&puzzle, &moved_block), true);
    }
}
