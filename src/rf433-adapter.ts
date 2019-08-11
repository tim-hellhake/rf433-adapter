/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */

import { Adapter, Device, Event } from 'gateway-addon';

import { spawn } from 'child_process';

import path from 'path';

class Rf433Device extends Device {
    public readonly trigger: () => void;

    constructor(adapter: any, code: string) {
        super(adapter, `rf434-${code}`);
        this['@context'] = 'https://iot.mozilla.org/schemas/';
        this['@type'] = ['SmartPlug'];
        this.name = `RF433 (${code})`;

        const receivedEvent = new Event(null, 'received');
        this.events.set('received', receivedEvent);

        this.trigger = () => {
            console.log(`Triggered ${code}`)
            this.eventNotify(receivedEvent);
        }
    }
}

export class Rf433Adapter extends Adapter {
    constructor(addonManager: any, manifest: any) {
        super(addonManager, Rf433Adapter.name, manifest.name);
        addonManager.addAdapter(this);

        const devices: { [name: string]: Rf433Device } = {};

        const child = spawn(path.resolve(__dirname, '../native/sniffer'));

        child.stdout.on('data', (chunk) => {
            const code = chunk.toString().replace('\n', '');
            let device = devices[code];

            if (!device) {
                console.log(`Discovered new device with code ${code}`);
                device = new Rf433Device(this, code);
                devices[code] = device;
                this.handleDeviceAdded(device);
            }

            device.trigger();
        });

        child.on('close', (code) => {
            console.warn(`Sniffer process exited with code ${code}`);
        });
    }
}
