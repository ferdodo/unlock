use serde::{Serialize};

#[derive(Copy, Clone, Serialize)]
pub struct Block {
	pub x: i32,
	pub y: i32,
	pub w: i32,
	pub h: i32,
}
