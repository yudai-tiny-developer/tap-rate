import(chrome.runtime.getURL('common.js')).then(common => {
    if (!common.isLiveChat(location.href)) {
        main(document.querySelector('ytd-app') ?? document.body, common);
    }
});

function main(app, common) {
    function loadSettings() {
        chrome.storage.local.get(common.storage, data => {
            create_buttons(data);
            document.dispatchEvent(new CustomEvent('_tap_rate_loaded'));
        });
    }

    function create_buttons(data) {
        const area = app.querySelector('div.ytp-right-controls');
        if (area) {
            area.querySelectorAll('button._tap_rate_button').forEach(b => b.remove());
            const panel = area.querySelector('button.ytp-settings-button');

            if (common.value(data.v1_enabled, common.default_v1_enabled)) { create_button(common.value(data.v1, common.default_v1), area, panel); }
            if (common.value(data.v2_enabled, common.default_v2_enabled)) { create_button(common.value(data.v2, common.default_v2), area, panel); }
            if (common.value(data.v3_enabled, common.default_v3_enabled)) { create_button(common.value(data.v3, common.default_v3), area, panel); }
            if (common.value(data.v4_enabled, common.default_v4_enabled)) { create_button(common.value(data.v4, common.default_v4), area, panel); }
            if (common.value(data.v5_enabled, common.default_v5_enabled)) { create_button(common.value(data.v5, common.default_v5), area, panel); }
            if (common.value(data.v6_enabled, common.default_v6_enabled)) { create_button(common.value(data.v6, common.default_v6), area, panel); }
            if (common.value(data.v8_enabled, common.default_v8_enabled)) { create_button(common.value(data.v8, common.default_v8), area, panel); }
            if (common.value(data.v7_enabled, common.default_v7_enabled)) { create_button(common.value(data.v7, common.default_v7), area, panel); }
        }
    }

    function create_button(value, area, panel) {
        const button = document.createElement('button');
        button.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 72 72"><text font-size="20" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">${value}x</text></svg>`;
        button.classList.add('_tap_rate_button', '_tap_rate_button_' + value.toString().replace('.', '_'), 'ytp-button');
        button.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('_tap_rate', { detail: value }));
            button.blur();
        });
        area.insertBefore(button, panel);
    }

    document.addEventListener('_tap_rate_init', e => {
        new MutationObserver((mutations, observer) => {
            if (app.querySelector('div.ytp-right-controls')) {
                observer.disconnect();
                loadSettings();
            }
        }).observe(app, { childList: true, subtree: true });
        loadSettings();
    });

    chrome.storage.onChanged.addListener(() => {
        loadSettings();
    });

    const s = document.createElement('script');
    s.src = chrome.runtime.getURL('inject.js');
    s.onload = () => s.remove();
    (document.head || document.documentElement).append(s);
}