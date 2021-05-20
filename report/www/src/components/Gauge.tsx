// @ts-nocheck
import React, { useRef, useEffect } from "react";
import { Gauge as CanvasGauge, Donut } from "gaugeJS/dist/gauge.min";

// copied from https://unpkg.com/react-gaugejs@1.2.1/Gauge.js due to bad transpilation

type GaugeProps = {
  maxValue?: number;
  minValue?: number;
  width?: number;
  height?: number;
  animationSpeed?: number;
  options?: object;
  donut?: boolean;
  value: number;
  className?: string;
};

/**
 * React wrapper for GaugeJS.
 * @param {*} props
 * @return {Object} React element
 */
export const Gauge: React.FC<GaugeProps> = (props) => {
  const canvas = useRef();
  const span = useRef();
  const gauge = useRef();

  useEffect(() => {
    gauge.current = props.donut
      ? new Donut(canvas.current)
      : new CanvasGauge(canvas.current);
    gauge.current.setTextField(span.current);
    gauge.current.setOptions(props.options);
    gauge.current.maxValue = props.maxValue;
    gauge.current.setMinValue(props.minValue);
    gauge.current.animationSpeed = props.animationSpeed;
    gauge.current.set(props.value);
  }, [props.donut]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    gauge.current.setOptions(props.options);
  }, [props.options]);

  useEffect(() => {
    gauge.current.maxValue = props.maxValue;
  }, [props.maxValue]);

  useEffect(() => {
    gauge.current.setMinValue(props.minValue);
  }, [props.minValue]);

  useEffect(() => {
    gauge.current.animationSpeed = props.animationSpeed;
  }, [props.animationSpeed]);

  useEffect(() => {
    gauge.current.set(props.value);
  }, [props.value]);

  /* eslint-disable no-unused-vars */
  const {
    maxValue,
    minValue,
    animationSpeed,
    options,
    donut,
    value,
    textChangeHandler,
    ...passThroughProps
  } = props;
  /* eslint-enable no-unused-vars */

  return (
    <>
      <canvas
        ref={canvas}
        className="gauge-canvas"
        {...passThroughProps}
      ></canvas>
      <span ref={span} style={{ display: "none" }}></span>
    </>
  );
};

Gauge.defaultProps = {
  maxValue: 3000,
  minValue: 0,
  animationSpeed: 32,
  options: {
    // staticLabels: {
    //   font: "10px sans-serif", // Specifies font
    //   labels: [100, 130, 150, 220.1, 260, 300], // Print labels at these values
    //   color: "#000000", // Optional: Label text color
    //   fractionDigits: 0, // Optional: Numerical precision. 0=round off.
    // },
    percentColors: [
      [0.0, "#FF4E42"],
      [0.5, "#ffa400"],
      [0.9, "#0CCE6B"],
      //[0.90, "#ffa400"],
      //  [0.3, "#ff0000"],
      // [0.5, "#f9c802"],
      [1, "#0CCE6B"],
    ],
    angle: 0.25,
    lineWidth: 0.44,
    radiusScale: 1,
    pointer: {
      length: 0.6,
      strokeWidth: 0.035,
      color: "#333",
    },
    //limitMax: false,
    //limitMin: false,
    //colorStart: "red",
    //colorStop: "pink",
    strokeColor: "#FF4E42",
    generateGradient: true,
    highDpiSupport: true,
  },
  donut: false,
  textChangeHandler: () => {},
};

export default Gauge;
