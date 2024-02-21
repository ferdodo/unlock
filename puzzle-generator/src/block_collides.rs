use super::block::Block;

pub fn block_collides(a: &Block, b: &Block) -> bool {
	return a.x + a.w > b.x
		&& a.x < b.x + b.w
		&& a.y + a.h > b.y
		&& a.y < b.y + b.h;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_block_collides() {
        let block1 = Block { x: 0, y: 0, w: 10, h: 10 };
        let block2 = Block { x: 5, y: 5, w: 10, h: 10 };
        assert_eq!(block_collides(&block1, &block2), true);

        let block3 = Block { x: 0, y: 0, w: 10, h: 10 };
        let block4 = Block { x: 20, y: 20, w: 10, h: 10 };
        assert_eq!(block_collides(&block3, &block4), false);
    }
}
