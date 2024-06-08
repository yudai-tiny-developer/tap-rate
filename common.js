export const storage = [
    'v1', 'v1_enabled',
    'v2', 'v2_enabled',
    'v3', 'v3_enabled',
    'v4', 'v4_enabled',
    'v5', 'v5_enabled',
    'v6', 'v6_enabled',
    'v7', 'v7_enabled',
];

export const default_v1 = 0.25;
export const default_v2 = 0.5;
export const default_v3 = 0.75;
export const default_v4 = 1;
export const default_v5 = 1.25;
export const default_v6 = 1.5;
export const default_v7 = 2;
export const default_v8 = 1.75;

export const default_v1_enabled = false; // 0.25
export const default_v2_enabled = false; // 0.5
export const default_v3_enabled = false; // 0.75
export const default_v4_enabled = true; // 1
export const default_v5_enabled = false; // 1.25
export const default_v6_enabled = false; // 1.5
export const default_v7_enabled = true; // 2
export const default_v8_enabled = false; // 1.75

export function value(value, defaultValue) {
    return value === undefined ? defaultValue : value;
}