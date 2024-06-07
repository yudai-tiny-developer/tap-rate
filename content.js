import(chrome.runtime.getURL('common.js')).then(common =>
    main(common)
);

function main(common) {
    let init = true;

    new MutationObserver((mutations, observer) => {
        for (const m of mutations) {
            if (m.target.nodeName === 'DIV' && m.target.id === 'container' && m.target.classList.contains('ytd-player')) {
                apply_settings();
                return;
            }
        }
    }).observe(document, {
        childList: true,
        subtree: true,
    });

    if (document.body.querySelector('div#container.ytd-player')) {
        apply_settings();
    }

    chrome.storage.onChanged.addListener(() => {
        document.body.querySelectorAll('button._tap_rate_button').forEach(b => b.remove());
        apply_settings(true);
    });

    function apply_settings(force = false) {
        chrome.storage.local.get(common.storage, data => {
            create_buttons(data, force);

            if (init) {
                init = false;
                document.dispatchEvent(new CustomEvent('_tap_rate_init'));
            } else {
                document.dispatchEvent(new CustomEvent('_tap_rate_update'));
            }
        });
    }

    function create_buttons(data, force) {
        const area = document.body.querySelector('div.ytp-right-controls');
        if (area && (force || !area.getAttribute('_tap_rate'))) {
            area.setAttribute('_tap_rate', true);
            const panel = area.querySelector('button.ytp-settings-button');

            if (common.value(data.v1_enabled, common.default_v1_enabled)) { create_button(common.value(data.v1, common.default_v1), area, panel); }
            if (common.value(data.v2_enabled, common.default_v2_enabled)) { create_button(common.value(data.v2, common.default_v2), area, panel); }
            if (common.value(data.v3_enabled, common.default_v3_enabled)) { create_button(common.value(data.v3, common.default_v3), area, panel); }
            if (common.value(data.v4_enabled, common.default_v4_enabled)) { create_button(common.value(data.v4, common.default_v4), area, panel); }
            if (common.value(data.v5_enabled, common.default_v5_enabled)) { create_button(common.value(data.v5, common.default_v5), area, panel); }
            if (common.value(data.v6_enabled, common.default_v6_enabled)) { create_button(common.value(data.v6, common.default_v6), area, panel); }
            if (common.value(data.v7_enabled, common.default_v7_enabled)) { create_button(common.value(data.v7, common.default_v7), area, panel); }
        }
    }

    function create_button(value, area, panel) {
        const button = document.createElement('button');
        button.title = value + 'x';
        button.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 72 72"><text font-size="20" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#fff">${button.title}</text></svg>`;
        button.classList.add('_tap_rate_button', '_tap_rate_button_' + value.toString().replace('.', '_'), 'ytp-button');
        button.setAttribute('tabindex', '-1');
        button.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('_tap_rate', { detail: value }));
            button.blur();
        });

        area.insertBefore(button, panel);
    }

    const s = document.createElement('script');
    s.src = chrome.runtime.getURL('inject.js');
    s.onload = () => s.remove();
    (document.head || document.documentElement).append(s);
}