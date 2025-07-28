import(chrome.runtime.getURL('common.js')).then(common => {
    if (!common.isLiveChat(location.href)) {
        main(document.querySelector('ytd-app') ?? document.body, common);
    }
});

function main(app, common) {
    function loadSettings() {
        chrome.storage.local.get(common.storage, data => {
            settings = data;
            update_buttons();
            document.dispatchEvent(new CustomEvent('_tap_rate_loaded'));
        });
    }

    function update_buttons() {
        if (settings) {
            update_button(button_v1, settings.v1, common.default_v1, settings.v1_enabled, common.default_v1_enabled);
            update_button(button_v2, settings.v2, common.default_v2, settings.v2_enabled, common.default_v2_enabled);
            update_button(button_v3, settings.v3, common.default_v3, settings.v3_enabled, common.default_v3_enabled);
            update_button(button_v4, settings.v4, common.default_v4, settings.v4_enabled, common.default_v4_enabled);
            update_button(button_v5, settings.v5, common.default_v5, settings.v5_enabled, common.default_v5_enabled);
            update_button(button_v6, settings.v6, common.default_v6, settings.v6_enabled, common.default_v6_enabled);
            update_button(button_v7, settings.v7, common.default_v7, settings.v7_enabled, common.default_v7_enabled);
            update_button(button_v8, settings.v8, common.default_v8, settings.v8_enabled, common.default_v8_enabled);
            update_button(button_w1, settings.w1, common.default_w1, settings.w1_enabled, common.default_w1_enabled);
            update_button(button_w2, settings.w2, common.default_w2, settings.w2_enabled, common.default_w2_enabled);
            update_button(button_w3, settings.w3, common.default_w3, settings.w3_enabled, common.default_w3_enabled);
            update_button(button_w4, settings.w4, common.default_w4, settings.w4_enabled, common.default_w4_enabled);
            update_button(button_w5, settings.w5, common.default_w5, settings.w5_enabled, common.default_w5_enabled);
            update_button(button_w6, settings.w6, common.default_w6, settings.w6_enabled, common.default_w6_enabled);
            update_button(button_w7, settings.w7, common.default_w7, settings.w7_enabled, common.default_w7_enabled);
            update_button(button_w8, settings.w8, common.default_w8, settings.w8_enabled, common.default_w8_enabled);
        }
    }

    function update_button(button, value, default_value, enabled, default_enabled) {
        const label = common.value(value, default_value);
        const detail = label.toString().replace('.', '_');
        button.style.display = common.value(enabled, default_enabled) ? 'inline-flex' : 'none';
        button.classList.add('_tap_rate_button', '_tap_rate_button_' + detail, 'ytp-button');
        button.innerHTML = `<span class="ytp-live">${label}x</span>`;
        button.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('_tap_rate', { detail: label }));
        });
    }

    function create_button() {
        const button = document.createElement('button');
        button.style.display = 'none';
        return button;
    }

    const shortcut_command = command => {
        if (settings) {
            let value;
            switch (command) {
                case 'v1':
                    value = common.value(settings.v1, common.default_v1);
                    break;
                case 'v2':
                    value = common.value(settings.v2, common.default_v2);
                    break;
                case 'v3':
                    value = common.value(settings.v3, common.default_v3);
                    break;
                case 'v4':
                    value = common.value(settings.v4, common.default_v4);
                    break;
                case 'v5':
                    value = common.value(settings.v5, common.default_v5);
                    break;
                case 'v6':
                    value = common.value(settings.v6, common.default_v6);
                    break;
                case 'v7':
                    value = common.value(settings.v8, common.default_v8);
                    break;
                case 'v8':
                    value = common.value(settings.v7, common.default_v7);
                    break;
                case 'w1':
                    value = common.value(settings.w1, common.default_w1);
                    break;
                case 'w2':
                    value = common.value(settings.w2, common.default_w2);
                    break;
                case 'w3':
                    value = common.value(settings.w3, common.default_w3);
                    break;
                case 'w4':
                    value = common.value(settings.w4, common.default_w4);
                    break;
                case 'w5':
                    value = common.value(settings.w5, common.default_w5);
                    break;
                case 'w6':
                    value = common.value(settings.w6, common.default_w6);
                    break;
                case 'w7':
                    value = common.value(settings.w7, common.default_w7);
                    break;
                case 'w8':
                    value = common.value(settings.w8, common.default_v8);
                    break;
                default:
                    return;
            }
            document.dispatchEvent(new CustomEvent('_tap_rate', { detail: value }));
        }
    };

    const button_v1 = create_button();
    const button_v2 = create_button();
    const button_v3 = create_button();
    const button_v4 = create_button();
    const button_v5 = create_button();
    const button_v6 = create_button();
    const button_v7 = create_button();
    const button_v8 = create_button();
    const button_w1 = create_button();
    const button_w2 = create_button();
    const button_w3 = create_button();
    const button_w4 = create_button();
    const button_w5 = create_button();
    const button_w6 = create_button();
    const button_w7 = create_button();
    const button_w8 = create_button();

    let settings;
    let area;
    let panel;

    chrome.runtime.onMessage.addListener(shortcut_command);

    chrome.storage.onChanged.addListener(loadSettings);

    document.addEventListener('_tap_rate_init', () => {
        const detect_interval = setInterval(() => {
            const player = app.querySelector('div#movie_player');
            if (!player) {
                return;
            }

            area = player.querySelector('div.ytp-right-controls-left'); // new style
            if (!area) {
                area = player.querySelector('div.ytp-right-controls'); // old style
                if (!area) {
                    return;
                }
            }

            panel = area.querySelector('button.ytp-subtitles-button');
            if (!panel) {
                return;
            }

            clearInterval(detect_interval);

            area.insertBefore(button_w8, panel.nextSibling);
            area.insertBefore(button_w7, button_w8);
            area.insertBefore(button_w6, button_w7);
            area.insertBefore(button_w5, button_w6);
            area.insertBefore(button_w4, button_w5);
            area.insertBefore(button_w3, button_w4);
            area.insertBefore(button_w2, button_w3);
            area.insertBefore(button_w1, button_w2);
            area.insertBefore(button_v7, button_w1);
            area.insertBefore(button_v8, button_v7);
            area.insertBefore(button_v6, button_v8);
            area.insertBefore(button_v5, button_v6);
            area.insertBefore(button_v4, button_v5);
            area.insertBefore(button_v3, button_v4);
            area.insertBefore(button_v2, button_v3);
            area.insertBefore(button_v1, button_v2);

            loadSettings();
        }, 500);
    });

    const s = document.createElement('script');
    s.src = chrome.runtime.getURL('inject.js');
    s.onload = () => s.remove();
    (document.head || document.documentElement).append(s);
}