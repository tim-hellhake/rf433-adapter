# RF433 adapter

[![dependencies](https://david-dm.org/tim-hellhake/rf433-adapter.svg)](https://david-dm.org/tim-hellhake/rf433-adapter)
[![devDependencies](https://david-dm.org/tim-hellhake/rf433-adapter/dev-status.svg)](https://david-dm.org/tim-hellhake/rf433-adapter?type=dev)
[![optionalDependencies](https://david-dm.org/tim-hellhake/rf433-adapter/optional-status.svg)](https://david-dm.org/tim-hellhake/rf433-adapter?type=optional)
[![license](https://img.shields.io/badge/license-MPL--2.0-blue.svg)](LICENSE)

This addon allows you to integrate 433 MHz devices into your raspberry pi based gateway.

Simply connect a rf433 receiver to gpio port 2 of your raspberry pi.

See http://wiringpi.com/pins/ for the correct location of the pin.

# How to use
Currently the adapter is read-only.
To add a new device trigger a transmission on the device.
As soon the addon receives the code it will create a new thing.
