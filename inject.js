function _tap_rate_update_class(remove_class, add_target_class, add_value) {
    for (const button of document.body.querySelectorAll('button._tap_rate_button')) {
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
    if (document.body.querySelector('button._tap_rate_button._tap_rate_button_' + value)) {
        _tap_rate_update_class('_tap_rate_active', '_tap_rate_button_' + value, '_tap_rate_active')
    } else {
        _tap_rate_update_class('_tap_rate_active', '_tap_rate_tap', '_tap_rate_active')
    }
}

function _tap_rate_init(value) {
    _tap_rate_activate(value);
}

document.addEventListener('_tap_rate_init', e => {
    const player = document.body.querySelector('div#movie_player');
    _tap_rate_activate(player.getPlaybackRate());
    player.addEventListener('onPlaybackRateChange', _tap_rate_init);
});

document.addEventListener('_tap_rate', e => {
    _tap_rate_update_class('_tap_rate_tap', '_tap_rate_button_' + e.detail, '_tap_rate_tap');
    const player = document.body.querySelector('div#movie_player');
    player.setPlaybackRate(e.detail);
});