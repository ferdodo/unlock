FROM rust
RUN cargo install wasm-pack
WORKDIR /tmp
RUN git clone https://github.com/ferdodo/unlock-puzzle-generator
WORKDIR /unlock/wasm
RUN cp -r /tmp/unlock-puzzle-generator/* .
RUN cargo build
RUN cargo test
RUN wasm-pack build --target web
