use super::block::Block;
use serde::{Serialize};

#[derive(Serialize)]
pub struct Latch {
	pub block: Block,
}
