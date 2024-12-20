const _tap_rate_app = document.querySelector('ytd-app') ?? document.body;

function _tap_rate_update_class(remove_class, add_target_class, add_value) {
    for (const button of _tap_rate_app.querySelectorAll('button._tap_rate_button')) {
        const oldToken = button.classList.contains(remove_class) ? remove_class : undefined;
        const newToken = button.classList.contains(add_target_class) ? add_value : undefined;
        if (oldToken && newToken) {
            button.classList.replace(oldToken, newToken);
        } else if (oldToken) {
            button.classList.remove(oldToken);
        } else if (newToken) {
            button.classList.add(newToken);
        }
    }
}

function _tap_rate_activate(value) {
    _tap_rate_update_class('_tap_rate_active', '_tap_rate_button_' + value.toString().replace('.', '_'), '_tap_rate_active');
}

let _tap_rate_init = true;

document.addEventListener('_tap_rate_loaded', e => {
    const player = _tap_rate_app.querySelector('div#movie_player');
    if (player) {
        _tap_rate_activate(player.getPlaybackRate());
        if (_tap_rate_init) {
            _tap_rate_init = false;
            player.addEventListener('onPlaybackRateChange', e => {
                _tap_rate_activate(e);
            });
        }
    }
});

document.addEventListener('_tap_rate', e => {
    _tap_rate_update_class('_tap_rate_tap', '_tap_rate_button_' + e.detail.toString().replace('.', '_'), '_tap_rate_tap');
    const player = _tap_rate_app.querySelector('div#movie_player');
    if (player) {
        player.setPlaybackRate(e.detail);

        player.dispatchEvent(new MouseEvent('mouseout'));
    }
});

document.dispatchEvent(new CustomEvent('_tap_rate_init'));