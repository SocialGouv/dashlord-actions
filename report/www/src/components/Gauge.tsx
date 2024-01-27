import React from "react";

import dynamic from "next/dynamic";

const ReactSpeedometer = dynamic(() => import("react-d3-speedometer"), {
  ssr: false,
});

type GaugeProps = {
  maxValue?: number;
  minValue?: number;
  width?: number;
  height?: number;
  animationSpeed?: number;
  options?: object;
  reverseColors?: boolean;
  donut?: boolean;
  value: number;
  className?: string;
  style?: object;
  customSegmentStops?: any;
  segmentColors?: any;
  segments?: number;
  currentValueText?: string;
};

const defaultSegmentColors = ["#ff6666", "#ffce00", "#00b353"];

export const Gauge: React.FC<GaugeProps> = (props) => {
  let segmentColors = [...(props.segmentColors || defaultSegmentColors)];
  if (props.reverseColors) {
    segmentColors.reverse();
  }
  return (
    <div
      style={{
        background: "var(--background-contrast-grey)",
      }}
    >
      <ReactSpeedometer
        forceRender={true}
        {...props}
        segmentColors={segmentColors}
      />
    </div>
  );
};
