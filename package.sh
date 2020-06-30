#!/bin/bash -e

# Setup environment for building inside Dockerized toolchain
export NVM_DIR="${HOME}/.nvm"
[ -s "${NVM_DIR}/nvm.sh" ] && source "${NVM_DIR}/nvm.sh"
[ $(id -u) = 0 ] && umask 0

# build native dependency
git submodule update --init
cd native
make clean all
cd ..

npm install
npm run build

rm -rf node_modules

shasum --algorithm 256 manifest.json package.json lib/*.js native/sniffer LICENSE README.md > SHA256SUMS

TARFILE=`npm pack`

shasum --algorithm 256 ${TARFILE} > ${TARFILE}.sha256sum

rm -rf SHA256SUMS
