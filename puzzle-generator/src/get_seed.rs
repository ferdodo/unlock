use chrono::prelude::*;

pub fn get_seed() -> &'static str {
    let local: DateTime<Local> = Local::now();
    let formatted_date = local.format("%Y%m%d").to_string();
    let padded_date = format!("{:0>32}", formatted_date);
    Box::leak(padded_date.into_boxed_str())
}
