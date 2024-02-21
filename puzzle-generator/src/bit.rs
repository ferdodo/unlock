use super::block::Block;
use serde::{Serialize};

#[derive(Serialize)]
pub struct Bit {
	pub id: u32,
	pub block: Block,
}
