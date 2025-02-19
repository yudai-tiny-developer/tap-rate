(() => {
    let player;
    let area;
    let onPlaybackRateChange;

    function update_class(remove_class, add_target_class, add_value) {
        area = area ?? document.querySelector('div.ytp-right-controls');
        if (area) {
            for (const button of area.querySelectorAll('button._tap_rate_button')) {
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
    }

    function activate(value) {
        update_class('_tap_rate_active', '_tap_rate_button_' + value.toString().replace('.', '_'), '_tap_rate_active');
    }

    document.addEventListener('_tap_rate_loaded', () => {
        player = player ?? document.querySelector('div#movie_player');
        if (player) {
            activate(player.getPlaybackRate());

            if (!onPlaybackRateChange) {
                onPlaybackRateChange = e => {
                    activate(e);
                };
                player.addEventListener('onPlaybackRateChange', onPlaybackRateChange);
            }
        }
    });

    document.addEventListener('_tap_rate', e => {
        player = player ?? document.querySelector('div#movie_player');
        if (player) {
            player.setPlaybackRate(e.detail);
            setTimeout(() => player.dispatchEvent(new MouseEvent('mouseout')), 500);
        }
    });

    document.dispatchEvent(new CustomEvent('_tap_rate_init'));
})();