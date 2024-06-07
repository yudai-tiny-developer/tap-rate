function _tap_rate_remove_class(selector, value) {
    for (const button of document.body.querySelectorAll(selector)) {
        button.classList.remove(value);
    }
}

function _tap_rate_add_class(selector, value) {
    for (const button of document.body.querySelectorAll(selector)) {
        button.classList.add(value);
    }
}

function _tap_rate_activate(value) {
    _tap_rate_remove_class('button._tap_rate_active', '_tap_rate_active');
    _tap_rate_add_class('button._tap_rate_button_' + value, '_tap_rate_active');

    if (!document.body.querySelector('button._tap_rate_active')) {
        _tap_rate_add_class('button._tap_rate_tap', '_tap_rate_active');
    }
}

document.addEventListener('_tap_rate', e => {
    _tap_rate_remove_class('button._tap_rate_tap', '_tap_rate_tap');
    _tap_rate_add_class('button._tap_rate_button_' + e.detail, '_tap_rate_tap');

    const player = document.body.querySelector('div#movie_player');
    player.setPlaybackRate(e.detail);
});

document.addEventListener('_tap_rate_init', e => {
    const player = document.body.querySelector('div#movie_player');
    _tap_rate_activate(player.getPlaybackRate());
    player.addEventListener('onPlaybackRateChange', value => {
        console.log('onPlaybackRateChange');
        _tap_rate_activate(value);
    });
});

document.addEventListener('_tap_rate_update', e => {
    const player = document.body.querySelector('div#movie_player');
    _tap_rate_activate(player.getPlaybackRate());
});