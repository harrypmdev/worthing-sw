import { jwtDecode } from "jwt-decode"
import WavEncoder from 'wav-encoder';
import { axiosReq } from "../api/axiosDefaults";

/**
 * Fetch more data from the given resource and update the resource
 * to include any new and unique data.
 * For use in the 'InfiniteScroll' component.
 * 
 * @param {Object} resource - The paginated resource object, as retrieved from an endpoint
 *                            such as '/posts' or '/comments'.
 * 
 * @param {Function} setResource - The setter function for the resource object; the function
 *                                 does not return a value, it uses the setter directly.
 */
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  // eslint-disable-next-line no-empty, no-unused-vars
  } catch (err) {}
};

/**
 * Set the refresh token timestamp in local storage.
 * 
 * @param {Object} data The data from which the refresh token should be set
 *                      as returned from the '/dj-rest-auth/login' endpoint.
 */
export const setTokenTimestamp = data => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    localStorage.setItem('refreshTokenTimestamp', refreshTokenTimestamp);
}

/**
 * Determine whether the refresh token needs to be refreshed based on whether
 * it is in local storage or not
 * 
 * @returns {boolean} Whether or not the token should be refreshed.
 */
export const shouldRefreshToken = () => (
    !!localStorage.getItem('refreshTokenTimestamp')
)

/**
 * Remove token timestamp from local storage.
 */
export const removeTokenTimestamp = () => {
    localStorage.removeItem('refreshTokenTimestamp');
}

/**
 * Trim an audio file down to a given maximum time frame in seconds.
 * 
 * @param {File} file The audio file that should be trimmed.
 * 
 * @param {number} maxDurationInSeconds The maximum duration the audio file should run for.
 *                                      Files already under this duration will not be shortened.
 * 
 * @returns {Promise<Blob>} A promise that resolves to a WAV file trimmed to the given duration
 */
export const trimAudio = async (file, maxDurationInSeconds) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const arrayBuffer = await file.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  // Calculate max samples according to sample rate and 'maxDurationInSeconds'
  const sampleRate = audioBuffer.sampleRate;
  const maxSamples = maxDurationInSeconds * sampleRate;

  // Account for cases where the given file length is already shorter than the
  // given max duration
  const maxLength = Math.min(maxSamples, audioBuffer.length)

  const trimmedBuffer = audioContext.createBuffer(
    audioBuffer.numberOfChannels,
    maxLength,
    sampleRate,
  );

  for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
    trimmedBuffer.copyToChannel(
      audioBuffer.getChannelData(channel).slice(0, maxSamples),
      channel
    );
  }

  return await convertToWAV(trimmedBuffer);
}

/**
 * Convert from AudioBuffer to WAV.
 * 
 * @param {*} audioBuffer The AudioBuffer to convert.
 * 
 * @returns {Promise<Blob>} A promise that resolves to a WAV file.
 */
const convertToWAV = async (audioBuffer) => {
  const wavData = await WavEncoder.encode({
    sampleRate: audioBuffer.sampleRate,
    channelData: Array.from({ length: audioBuffer.numberOfChannels }, (_, i) =>
      audioBuffer.getChannelData(i)
    ),
  });

  // Create a Blob from the WAV data
  const wavBlob = new Blob([wavData], { type: 'audio/wav' });
  return wavBlob;
}