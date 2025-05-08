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

    function onPlaybackRateChange() {
        const v = video_instance();
        if (v) {
            activate(v.playbackRate);
        }
    }

    function video_instance() {
        if (!video?.parentNode && player) {
            video = player.querySelector('video.html5-main-video');
            if (video) {
                video.addEventListener('ratechange', onPlaybackRateChange);
            }
        }
        return video;
    }

    const app = document.querySelector('ytd-app') ?? document.body; // YouTube.com or Embedded Player

    let player;
    let video;
    let area;

    document.addEventListener('_tap_rate_loaded', () => {
        const v = video_instance();
        if (v) {
            activate(v.playbackRate);
        }
    });

    document.addEventListener('_tap_rate', e => {
        if (player) {
            player.setPlaybackRate(e.detail);

            const v = video_instance();
            if (v) {
                v.playbackRate = e.detail;
            }

            setTimeout(() => player.dispatchEvent(new MouseEvent('mouseout')), 500);
        }
    });

    const detect_interval = setInterval(() => {
        player = app.querySelector('div#movie_player');
        if (!player) {
            return;
        }

        area = player.querySelector('div.ytp-right-controls');
        if (!area) {
            return;
        }

        clearInterval(detect_interval);

        player.addEventListener('onPlaybackRateChange', onPlaybackRateChange);
        video_instance();
        document.dispatchEvent(new CustomEvent('_tap_rate_init'));
    }, 500);
})();