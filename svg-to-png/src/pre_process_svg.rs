use super::bit_v_3::bit_v_3;
use super::bit_v_2::bit_v_2;
use super::bit_h_3::bit_h_3;
use super::bit_h_2::bit_h_2;

pub fn pre_process_svg(svg_string: &str, width: i32, height: i32) -> String {
    let width_str = format!("{}", width);
    let height_str = format!("{}", height);
    
    let replaced_svg = svg_string.replace("<svg", &format!("<svg width=\"{}\" height=\"{}\"", width_str, height_str));
    let replaced_svg = replaced_svg.replace("bit-v-3.png", &format!("data:image/png;base64,{}", bit_v_3()));
    let replaced_svg = replaced_svg.replace("bit-v-2.png", &format!("data:image/png;base64,{}", bit_v_2()));
    let replaced_svg = replaced_svg.replace("bit-h-3.png", &format!("data:image/png;base64,{}", bit_h_3()));
    let replaced_svg = replaced_svg.replace("bit-h-2.png", &format!("data:image/png;base64,{}", bit_h_2()));
    return replaced_svg;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_pre_process_svg() {
        let svg_input = "<svg></svg>";
        let width = 100;
        let height = 50;

        let expected_output = "<svg width=\"100\" height=\"50\"></svg>";
        let actual_output = pre_process_svg(svg_input, width, height);

        assert_eq!(expected_output, actual_output);
    }
}
