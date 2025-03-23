(() => {
    function update_class(remove_class, add_target_class, add_value) {
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

    function onPlaybackRateChange(e) {
        activate(e);
    }

    const app = document.querySelector('ytd-app') ?? document.body; // YouTube.com or Embedded Player

    let player;
    let area;

    document.addEventListener('_tap_rate_loaded', () => {
        if (player) {
            activate(player.getPlaybackRate());
        }
    });

    document.addEventListener('_tap_rate', e => {
        if (player) {
            player.setPlaybackRate(e.detail);
            setTimeout(() => player.dispatchEvent(new MouseEvent('mouseout')), 500);
        }
    });

    setInterval(() => {
        const player_c = app.querySelector('div#movie_player');
        if (!player_c || player_c === player) {
            return;
        }
        player = player_c;

        area = player.querySelector('div.ytp-right-controls');
        if (!area) {
            return;
        }

        player.addEventListener('onPlaybackRateChange', onPlaybackRateChange);

        document.dispatchEvent(new CustomEvent('_tap_rate_init'));
    }, 1000);
})();