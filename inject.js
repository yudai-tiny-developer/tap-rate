(() => {
    function update_class(remove_class, add_target_class, add_value) {
        for (const button of document.getElementsByClassName('_tap_rate_button')) {
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

    function activate(value) {
        update_class('_tap_rate_active', '_tap_rate_button_' + value.toString().replace('.', '_'), '_tap_rate_active');
    }

    function onPlaybackRateChange() {
        const video = video_instance();
        if (!video) return;

        activate(video.playbackRate);
    }

    function video_instance() {
        if (!video_cache?.parentNode && player) {
            video_cache = player.querySelector('video.html5-main-video');
            if (video_cache) {
                video_cache.addEventListener('ratechange', onPlaybackRateChange);
            }
        }
        return video_cache;
    }

    let player;
    let video_cache;

    document.addEventListener('_tap_rate_loaded', () => {
        const video = video_instance();
        if (!video) return;

        activate(video.playbackRate);
    });

    document.addEventListener('_tap_rate', e => {
        const video = video_instance();
        if (!video) return;

        player.setPlaybackRate(e.detail);
        video.playbackRate = e.detail;
        setTimeout(() => player.dispatchEvent(new MouseEvent('mouseout')), 500);
    });

    const detect_interval = setInterval(() => {
        player = document.getElementById("movie_player");
        if (!player) return;

        clearInterval(detect_interval);

        player.addEventListener('onPlaybackRateChange', onPlaybackRateChange);
        video_instance();

        document.dispatchEvent(new CustomEvent('_tap_rate_init'));
    }, 500);
})();