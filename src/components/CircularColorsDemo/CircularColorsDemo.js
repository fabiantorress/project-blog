"use client";
import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";
import { motion } from "framer-motion";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [status, setStatus] = React.useState("idle");
  const id = React.useId();

  React.useEffect(() => {
    if (status === "idle") {
      return;
    }
    const timeoutId = window.setInterval(() => {
      setTimeElapsed((prevtimeElapsed) => prevtimeElapsed + 1);
    }, 1000);
    return () => {
      window.clearInterval(timeoutId);
    };
  }, [status]);

  // COLORS array:
  const selectedColor = COLORS[timeElapsed % COLORS.length];

  return (
      <Card as="section" className={styles.wrapper}>
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected = color.value === selectedColor.value;
            return (
              <li className={styles.color} key={index}>
                {isSelected && (
                  <motion.div
                    className={styles.selectedColorOutline}
                    layoutId={`selected-color-${id}`}
                  />
                )}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected && styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>{color.label}</VisuallyHidden>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.timeWrapper}>
          <dl className={styles.timeDisplay}>
            <dt>Time Elapsed</dt>
            <dd>{timeElapsed}</dd>
          </dl>
          <div className={styles.actions}>
            <button
              onClick={() => {
                if (status === "playing") {
                  setStatus("idle");
                } else {
                  setStatus("playing");
                }
              }}
            >
              {status === "playing" ? <Pause /> : <Play />}
              <VisuallyHidden>
                {status === "playing" ? "Pause" : "Play"}
              </VisuallyHidden>
            </button>

            <button
              onClick={() => {
                setStatus("idle");
                setTimeElapsed(0);
              }}
            >
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
  );
}

export default CircularColorsDemo;
