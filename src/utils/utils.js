import { jwtDecode } from "jwt-decode"
import WavEncoder from 'wav-encoder';
import { axiosReq } from "../api/axiosDefaults";

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
  } catch (err) {}
};

export const setTokenTimestamp = data => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    localStorage.setItem('refreshTokenTimestamp', refreshTokenTimestamp);
}

export const shouldRefreshToken = () => (
    !!localStorage.getItem('refreshTokenTimestamp')
)

export const removeTokenTimestamp = () => {
    localStorage.removeItem('refreshTokenTimestamp');
}

export const trimAudio = async (file, maxDurationInSeconds) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const arrayBuffer = await file.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const sampleRate = audioBuffer.sampleRate;
  const maxSamples = maxDurationInSeconds * sampleRate;
  const trimmedBuffer = audioContext.createBuffer(
    audioBuffer.numberOfChannels,
    Math.min(maxSamples, audioBuffer.length),
    sampleRate
  );

  for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
    trimmedBuffer.copyToChannel(
      audioBuffer.getChannelData(channel).slice(0, maxSamples),
      channel
    );
  }

  const trimmedBlob = await convertToWAV(trimmedBuffer);
  return trimmedBlob;
}

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