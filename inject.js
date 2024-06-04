document.addEventListener('_tap_rate', e => {
    const player = document.body.querySelector('div#movie_player');
    player.setPlaybackRate(e.detail);
});