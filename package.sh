#!/bin/bash -e

# build native dependency
git submodule update --init
cd native
make clean all
cd ..

npm install
npm run build
rm -rf node_modules
if [ -z "${ADDON_ARCH}" ]; then
  TARFILE_SUFFIX=
else
  TARFILE_SUFFIX="-${ADDON_ARCH}"
fi

sha256sum package.json manifest.json lib/*.js native/sniffer LICENSE README.md > SHA256SUMS
TARFILE=`npm pack`
TARFILE_ARCH="${TARFILE/.tgz/${TARFILE_SUFFIX}.tgz}"
mv ${TARFILE} ${TARFILE_ARCH}
echo "Created ${TARFILE_ARCH}"
