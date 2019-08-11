/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

declare module 'gateway-addon' {
    class Event {
        constructor(device: any, name: string, data?: any);
    }

    class Device {
        protected '@context': string;
        protected '@type': string[];
        protected name: string;
        protected description: string;

        constructor(adapter: Adapter, id: string);

        public events: Map<String, Event>;
        public eventNotify(event: Event): void;
    }

    class Adapter {
        constructor(addonManager: any, id: string, packageName: string);

        public handleDeviceAdded(device: Device): void;
    }
}
