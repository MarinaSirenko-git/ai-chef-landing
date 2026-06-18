export function initDemoVideo() {
  const root = document.querySelector('[data-demo-video]');
  if (!root) return;

  const startButton = root.querySelector('.js-demo-play');
  const toggleButton = root.querySelector('.js-demo-toggle');
  const progress = root.querySelector('.js-demo-progress');
  const time = root.querySelector('.js-demo-time');
  const video = root.querySelector('.demo__video');
  const videoSrc = root.dataset.videoSrc;

  if (!startButton || !toggleButton || !progress || !time || !video || !videoSrc) return;

  const formatTime = (value) => {
    if (!Number.isFinite(value) || value < 0) return '0:00';
    const rounded = Math.floor(value);
    const minutes = Math.floor(rounded / 60);
    const seconds = String(rounded % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const updateToggleState = () => {
    const isPaused = video.paused;
    toggleButton.classList.toggle('is-paused', isPaused);
    toggleButton.setAttribute('aria-label', isPaused ? 'Play video' : 'Pause video');
  };

  const updateTime = () => {
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    const current = Number.isFinite(video.currentTime) ? video.currentTime : 0;
    time.textContent = `${formatTime(current)} / ${formatTime(duration)}`;

    if (duration > 0) {
      const progressValue = Math.round((current / duration) * 1000);
      progress.value = String(progressValue);
      progress.style.setProperty('--demo-progress-value', `${(progressValue / 1000) * 100}%`);
    } else {
      progress.value = '0';
      progress.style.setProperty('--demo-progress-value', '0%');
    }
  };

  const startPlayback = async () => {
    if (!root.classList.contains('is-playing')) {
      video.src = videoSrc;
      root.classList.add('is-playing');
    }

    try {
      await video.play();
    } catch {
      // Browser autoplay policies may block programmatic play.
    }
    updateToggleState();
  };

  startButton.addEventListener('click', () => {
    void startPlayback();
  });

  toggleButton.addEventListener('click', async () => {
    if (video.paused) {
      try {
        await video.play();
      } catch {
        // Browser autoplay policies may block programmatic play.
      }
    } else {
      video.pause();
    }
    updateToggleState();
  });

  progress.addEventListener('input', () => {
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    if (duration <= 0) return;
    video.currentTime = (Number(progress.value) / 1000) * duration;
  });

  video.addEventListener('loadedmetadata', updateTime);
  video.addEventListener('timeupdate', updateTime);
  video.addEventListener('play', updateToggleState);
  video.addEventListener('pause', updateToggleState);
  video.addEventListener('ended', updateToggleState);

  updateTime();
  updateToggleState();
  video.addEventListener('ended', () => {
    progress.value = '0';
    progress.style.setProperty('--demo-progress-value', '0%');
  });
}
