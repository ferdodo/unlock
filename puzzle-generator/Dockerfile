FROM rust
WORKDIR /unlock/puzzle-generator
RUN cargo install wasm-pack
COPY . .
RUN cargo build
RUN cargo test
RUN wasm-pack build --target web
