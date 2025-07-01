import { useState, useRef, useEffect } from 'react';
import Modal from '~/components/Modal';
import { Button } from '~/components/Button';
import { cx } from '~/utils/string';
import CameraIcon from '~/svgs/Camera';
import { showError } from '~/global-contexts/toast';

interface CameraModalProps {
  isOpen: boolean;
  onClose: (visible: false) => void;
  onCapture: (blob: Blob) => void;
}

export default function CameraModal({ isOpen, onClose, onCapture }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startRef = useRef(() => {});
  const stopRef = useRef(() => {});
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  startRef.current = async () => {
    try {
      setHasPermission(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 640 },
          facingMode: 'user', // Front camera for selfies
        },
      });

      setStream(mediaStream);
      setHasPermission(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Camera access denied or not available:', error);
      setHasPermission(false);
      showError('Camera access is required to take a photo. Please enable camera permissions.');
    }
  };

  stopRef.current = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setHasPermission(null);
  };

  useEffect(() => {
    if (isOpen) {
      startRef.current();
    } else {
      stopRef.current();
    }

    // Cleanup on unmount
    return () => {
      stopRef.current();
    };
  }, [isOpen]);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Set canvas size to match video
    canvas.width = 320;
    canvas.height = 320;

    // Calculate crop dimensions to make it square
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const size = Math.min(videoWidth, videoHeight);
    const offsetX = (videoWidth - size) / 2;
    const offsetY = (videoHeight - size) / 2;

    // Draw the cropped video frame to canvas
    ctx.drawImage(
      video,
      offsetX,
      offsetY,
      size,
      size, // Source rectangle (square crop)
      0,
      0,
      320,
      320 // Destination rectangle
    );

    // Convert canvas to blob
    canvas.toBlob(
      (blob) => {
        if (blob) {
          onCapture(blob);
          onClose(false);
        }
        setIsCapturing(false);
      },
      'image/jpeg',
      0.8
    );
  };

  const handleClose = () => {
    stopRef.current();
    onClose(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Take Profile Photo" size="md" showCloseButton={true}>
      <div className="p-6">
        <div className="text-center">
          {hasPermission === null && (
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 dark:text-gray-400">Requesting camera access...</p>
            </div>
          )}

          {hasPermission === false && (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <CameraIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Camera Access Required</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Please allow camera access to take a profile photo.
                </p>
                <Button onClick={startRef.current} variant="primary" size="sm">
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {hasPermission === true && (
            <div className="space-y-4">
              <div className="relative">
                {/* Video preview */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={cx(
                    'w-80 h-80 object-cover rounded-lg border-4 border-gray-200 dark:border-gray-600',
                    'mx-auto block'
                  )}
                  style={{
                    transform: 'scaleX(-1)', // Mirror the video for selfie mode
                  }}
                />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 border-2 border-white rounded-full shadow-lg opacity-50"></div>
                </div>

                {isCapturing && (
                  <div className="absolute inset-0 bg-white bg-opacity-80 rounded-lg flex items-center justify-center">
                    <div className="text-gray-900 font-medium">Capturing...</div>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Position yourself within the circle and click "Take Photo"
              </p>

              <div className="flex space-x-3 justify-center">
                <Button onClick={handleClose} variant="outline" size="md" disabled={isCapturing}>
                  Cancel
                </Button>
                <Button
                  onClick={capturePhoto}
                  variant="primary"
                  size="md"
                  disabled={isCapturing}
                  leftIcon={<CameraIcon className="w-4 h-4" />}>
                  {isCapturing ? 'Capturing...' : 'Take Photo'}
                </Button>
              </div>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </Modal>
  );
}
