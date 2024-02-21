FROM rust
WORKDIR /unlock/svg-to-png
RUN cargo install wasm-pack
COPY Cargo.toml .
RUN mkdir -p src
RUN touch src/lib.rs
RUN cargo build
COPY . .
RUN cargo build
RUN cargo test
RUN wasm-pack build --target web
