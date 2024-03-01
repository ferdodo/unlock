FROM rust
WORKDIR /unlock/pngs-to-gif
RUN cargo install wasm-pack
COPY Cargo.toml .
RUN mkdir -p src
RUN touch src/lib.rs
RUN cargo build
COPY . .
RUN cargo build
RUN cargo test
RUN wasm-pack build --target web
