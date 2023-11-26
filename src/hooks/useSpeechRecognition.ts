import { useCallback, useEffect, useState } from 'react';

interface useSpeechRecognitionProps {
  onMessage?: (message: string, isFinal: boolean) => void;
}

export const useSpeechRecognition = (props: useSpeechRecognitionProps) => {
  const { onMessage } = props;
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition>();

  const handleRecognitionEnd = useCallback(() => {
    setIsRecording(false);
  }, []);

  const toggleRecord = () => {
    if (isRecording) {
      speechRecognition?.abort();
      setIsRecording(false);

      return;
    }

    speechRecognition?.start();
    setIsRecording(true);
  };

  const handleRecognitionResult = useCallback((event: SpeechRecognitionEvent) => {
    const text = event.results[0][0].transcript;
    if (onMessage) onMessage(text, event.results[0].isFinal);
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.addEventListener('result', handleRecognitionResult);
    recognition.addEventListener('end', handleRecognitionEnd);

    setSpeechRecognition(recognition);
  }, [handleRecognitionResult, handleRecognitionEnd]);

  return { isRecording, speechRecognition, toggleRecord };
};
