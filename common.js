export const storage = [
    'v1', 'v1_enabled',
    'v2', 'v2_enabled',
    'v3', 'v3_enabled',
    'v4', 'v4_enabled',
    'v5', 'v5_enabled',
    'v6', 'v6_enabled',
    'v7', 'v7_enabled',
    'v8', 'v8_enabled',
    'w1', 'w1_enabled',
    'w2', 'w2_enabled',
    'w3', 'w3_enabled',
    'w4', 'w4_enabled',
    'w5', 'w5_enabled',
    'w6', 'w6_enabled',
    'w7', 'w7_enabled',
    'w8', 'w8_enabled',
];

export const default_v1 = 0.25;
export const default_v2 = 0.5;
export const default_v3 = 0.75;
export const default_v4 = 1;
export const default_v5 = 1.25;
export const default_v6 = 1.5;
export const default_v7 = 2;
export const default_v8 = 1.75;
export const default_w1 = 3.0;
export const default_w2 = 4.0;
export const default_w3 = 5.0;
export const default_w4 = 6.0;
export const default_w5 = 8.0;
export const default_w6 = 10.0;
export const default_w7 = 12.0;
export const default_w8 = 16.0;

export const default_v1_enabled = false; // 0.25
export const default_v2_enabled = false; // 0.5
export const default_v3_enabled = false; // 0.75
export const default_v4_enabled = true; // 1
export const default_v5_enabled = false; // 1.25
export const default_v6_enabled = false; // 1.5
export const default_v7_enabled = true; // 2
export const default_v8_enabled = false; // 1.75
export const default_w1_enabled = false; // 3.0
export const default_w2_enabled = false; // 4.0
export const default_w3_enabled = false; // 5.0
export const default_w4_enabled = false; // 6.0
export const default_w5_enabled = false; // 8.0
export const default_w6_enabled = false; // 10.0
export const default_w7_enabled = false; // 12.0
export const default_w8_enabled = false; // 16.0

export function value(value, defaultValue) {
    return value === undefined ? defaultValue : value;
}

export function isLiveChat(url) {
    return url.startsWith('https://www.youtube.com/live_chat?')
        || url.startsWith('https://www.youtube.com/live_chat_replay?')
        ;
}