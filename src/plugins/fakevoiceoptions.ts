/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import definePlugin, { OptionType } from "@utils/types";

export default definePlugin({
    name: "Fake Voice Options",
    description: "fake mute & deafen",
    authors: [{
        name: "SaucyDuck",
        id: 1004904120056029256n
    }],
    patches: [
        {
            find: "e.setSelfMute(n);",
            replacement: [{
                // prevent client-side mute
                match: /e\.setSelfMute\(n\);/g,
                replace: 'e.setSelfMute(Vencord.Settings.plugins["Fake Voice Options"].fakeMute?false:n);'
            },
            {
                // prevent client-side deafen
                match: /e\.setSelfDeaf\(t\.deaf\)/g,
                replace: 'e.setSelfDeaf(Vencord.Settings.plugins["Fake Voice Options"].fakeDeafen?false:t.deaf);'
            }]
        },
    ],
    options: {
        fakeMute: {
            description: "Make everyone believe you're muted (you can still speak)",
            type: OptionType.BOOLEAN,
            default: false,
        },
        fakeDeafen: {
            description: "Make everyone believe you're deafened (you can still hear)",
            type: OptionType.BOOLEAN,
            default: false,
        },
    },
});
