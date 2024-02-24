mod bit_v_2;
mod bit_v_3;
mod bit_h_2;
mod bit_h_3;
mod create_pixmap;
mod create_buffer;
mod render_pixmap;
mod pre_process_svg;
mod pixmap_to_png_string;
use render_pixmap::render_pixmap;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn svg_to_png(svg_string: &str) -> String {
    render_pixmap(svg_string)
}
