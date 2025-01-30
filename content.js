import(chrome.runtime.getURL('common.js')).then(common => {
    if (!common.isLiveChat(location.href)) {
        main(document.querySelector('ytd-app') ?? document.body, common);
    }
});

function main(app, common) {
    function applySettings(force) {
        if (settings) {
            update_buttons(settings, force);
            update_shortcut_command(settings);
            document.dispatchEvent(new CustomEvent('_tap_rate_loaded'));
        } else {
            loadSettings();
        }
    }

    function loadSettings() {
        chrome.storage.local.get(common.storage, data => {
            settings = data;
            applySettings(true);
        });
    }

    function update_buttons(data, force) {
        const area = app.querySelector('div.ytp-right-controls');
        if (area && (!area.querySelector('button._tap_rate_button') || force)) {
            let panel = area.querySelector('button.ytp-settings-button');
            panel = update_button(data.v7, common.default_v7, area, panel, data.v7_enabled, common.default_v7_enabled);
            panel = update_button(data.v8, common.default_v8, area, panel, data.v8_enabled, common.default_v8_enabled);
            panel = update_button(data.v6, common.default_v6, area, panel, data.v6_enabled, common.default_v6_enabled);
            panel = update_button(data.v5, common.default_v5, area, panel, data.v5_enabled, common.default_v5_enabled);
            panel = update_button(data.v4, common.default_v4, area, panel, data.v4_enabled, common.default_v4_enabled);
            panel = update_button(data.v3, common.default_v3, area, panel, data.v3_enabled, common.default_v3_enabled);
            panel = update_button(data.v2, common.default_v2, area, panel, data.v2_enabled, common.default_v2_enabled);
            panel = update_button(data.v1, common.default_v1, area, panel, data.v1_enabled, common.default_v1_enabled);
        }
    }

    function update_button(data, default_value, area, panel, enabled, default_enabled) {
        const value = common.value(data, default_value).toString().replace('.', '_');
        const button = area.querySelector('button._tap_rate_button_' + value) ?? create_button(common.value(data, default_value), area, panel);
        button.style.display = common.value(enabled, default_enabled) ? '' : 'none';
        return button;
    }

    function create_button(value, area, panel) {
        const button = document.createElement('button');
        button.style.display = 'none';
        button.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 72 72"><text font-size="20" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">${value}x</text></svg>`;
        button.classList.add('_tap_rate_button', '_tap_rate_button_' + value.toString().replace('.', '_'), 'ytp-button');
        button.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('_tap_rate', { detail: value }));
        });
        area.insertBefore(button, panel);
        return button;
    }

    function update_shortcut_command(data) {
        shortcut_command = command => {
            let value;
            switch (command) {
                case 'v1':
                    value = common.value(data.v1, common.default_v1);
                    break;
                case 'v2':
                    value = common.value(data.v2, common.default_v2);
                    break;
                case 'v3':
                    value = common.value(data.v3, common.default_v3);
                    break;
                case 'v4':
                    value = common.value(data.v4, common.default_v4);
                    break;
                case 'v5':
                    value = common.value(data.v5, common.default_v5);
                    break;
                case 'v6':
                    value = common.value(data.v6, common.default_v6);
                    break;
                case 'v7':
                    value = common.value(data.v8, common.default_v8);
                    break;
                case 'v8':
                    value = common.value(data.v7, common.default_v7);
                    break;
                default:
                    return;
            }
            document.dispatchEvent(new CustomEvent('_tap_rate', { detail: value }));
        };
    }

    let settings;
    let observer;
    let shortcut_command;

    document.addEventListener('_tap_rate_init', e => {
        loadSettings();
        observer?.disconnect();
        observer = new MutationObserver(() => applySettings());
        observer.observe(app, { childList: true, subtree: true });
    });

    chrome.storage.onChanged.addListener(() => {
        loadSettings();
    });

    chrome.runtime.onMessage.addListener(command => {
        shortcut_command(command);
    });

    const s = document.createElement('script');
    s.src = chrome.runtime.getURL('inject.js');
    s.onload = () => s.remove();
    (document.head || document.documentElement).append(s);
}