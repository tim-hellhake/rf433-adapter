#!/bin/sh

ls rc-switch || git clone https://github.com/sui77/rc-switch
cd rc-switch
git checkout a9da9c36820b02fc5613dfe2437e1187bcf5b402
cd ../native
make clean all
