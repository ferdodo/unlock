use super::block::Block;
use super::latch::Latch;
use super::bit::Bit;
use serde::{Serialize};

#[derive(Serialize)]
pub struct Puzzle {
	pub latch: Latch,
	pub block: Block,
	pub bits: Vec<Bit>
}
