mod create_pixmap;
mod create_buffer;
mod render_pixmap;
mod pixmap_to_png_string;
use render_pixmap::render_pixmap;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn svg_to_png(svg_string: &str) -> String {
    render_pixmap(svg_string)
}
