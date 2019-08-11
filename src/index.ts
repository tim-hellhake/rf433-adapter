/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */

import { Rf433Adapter } from './rf433-adapter';

export = (addonManager: any, manifest: any) => new Rf433Adapter(addonManager, manifest);
