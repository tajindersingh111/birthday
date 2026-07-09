"use client";

import { useEffect, useState, useRef } from "react";

export function useEasterEggs(onTriggerEasterEgg: (type: string, message: string) => void) {
  const [heartClicks, setHeartClicks] = useState(0);
  const konamiIndex = useRef(0);
  const konamiCode = [
    "arrowup",
    "arrowup",
    "arrowdown",
    "arrowdown",
    "arrowleft",
    "arrowright",
    "arrowleft",
    "arrowright",
    "b",
    "a",
  ];

  // 1. Konami Code detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === konamiCode[konamiIndex.current]) {
        konamiIndex.current++;
        if (konamiIndex.current === konamiCode.length) {
          onTriggerEasterEgg("konami", "Secret Unlocked: You found the key to my heart! I will love you in every universe. 🌌✨");
          konamiIndex.current = 0;
        }
      } else {
        // Reset index if the key doesn't match the sequence
        konamiIndex.current = key === konamiCode[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onTriggerEasterEgg]);

  // 2. Click heart 10 times
  const handleHeartClick = () => {
    setHeartClicks((prev) => {
      const next = prev + 1;
      if (next === 10) {
        onTriggerEasterEgg("heart10", "You really love pressing my heart 😄❤️");
        return 0; // reset
      }
      return next;
    });
  };

  // 3. Shake phone detection (Accelerometer)
  useEffect(() => {
    let lastX: number | null = null;
    let lastY: number | null = null;
    let lastZ: number | null = null;
    let lastUpdate = 0;
    const SHAKE_THRESHOLD = 15; // sensitivity

    const handleMotion = (e: DeviceMotionEvent) => {
      const acceleration = e.accelerationIncludingGravity;
      if (!acceleration) return;

      const currentTime = Date.now();
      if (currentTime - lastUpdate > 100) {
        const diffTime = currentTime - lastUpdate;
        lastUpdate = currentTime;

        const x = acceleration.x ?? 0;
        const y = acceleration.y ?? 0;
        const z = acceleration.z ?? 0;

        if (lastX !== null && lastY !== null && lastZ !== null) {
          const speed =
            (Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime) * 10000;

          if (speed > SHAKE_THRESHOLD * 100) {
            onTriggerEasterEgg("shake", "Shaken with love! Sending a rain of hearts your way... 💖🌧️");
          }
        }

        lastX = x;
        lastY = y;
        lastZ = z;
      }
    };

    // Request permissions for iOS 13+ device motion if necessary
    const requestDeviceMotion = async () => {
      if (
        typeof window !== "undefined" &&
        typeof (DeviceMotionEvent as any).requestPermission === "function"
      ) {
        try {
          const permissionState = await (DeviceMotionEvent as any).requestPermission();
          if (permissionState === "granted") {
            window.addEventListener("devicemotion", handleMotion);
          }
        } catch (error) {
          console.error("Error requesting DeviceMotion permission:", error);
        }
      } else {
        window.addEventListener("devicemotion", handleMotion);
      }
    };

    requestDeviceMotion();

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [onTriggerEasterEgg]);

  // 4. Long press photo handler
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const startLongPress = () => {
    longPressTimer.current = setTimeout(() => {
      onTriggerEasterEgg("longpress", "I Miss You ❤️");
    }, 800); // 800ms threshold for long press
  };

  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  return {
    handleHeartClick,
    photoLongPressProps: {
      onMouseDown: startLongPress,
      onMouseUp: cancelLongPress,
      onMouseLeave: cancelLongPress,
      onTouchStart: startLongPress,
      onTouchEnd: cancelLongPress,
    },
  };
}
