import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  TimeScale
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, TimeScale);

function SWQICurveChart({ measurements, highlightedMeasurementId, onPointClick, onPointHover }) {
  const sorted = [...measurements].sort(
    (a, b) => new Date(a.attributes.measured_at) - new Date(b.attributes.measured_at)
  );

  const data = {
    labels: sorted.map(m => m.attributes.measured_at),
    datasets: [
      {
        label: "SWQI",
        data: sorted.map(m => m.attributes.swqi),
        fill: false,
        borderColor: "#0077b6",
        backgroundColor: "#0077b6",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: sorted.map(m =>
          highlightedMeasurementId === m.id ? "#ff5722" : "#0077b6"
        ),
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `SWQI: ${ctx.parsed.y}`
        }
      }
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "dd.MM.yyyy HH:mm"
        },
        title: { display: true, text: "Date & Time" },
        ticks: { autoSkip: true, maxTicksLimit: 8 }
      },
      y: {
        title: { display: true, text: "SWQI" },
        beginAtZero: true
      }
    },
    onClick: (evt, elements) => {
      if (elements.length > 0) {
        const idx = elements[0].index;
        const mId = sorted[idx].id;
        onPointClick && onPointClick(mId);
      } else {
        onPointClick && onPointClick(null);
      }
    },
    onHover: (evt, elements) => {
      if (elements.length > 0) {
        const idx = elements[0].index;
        const mId = sorted[idx].id;
        onPointHover && onPointHover(mId);
      } else {
        onPointHover && onPointHover(null);
      }
    },
  };

  return (
    <div className="my-5">
      <h5 className="fw-bold text-center mb-3" style={{ color: "#0077b6" }}>SWQI Curve</h5>
      <Line data={data} options={options} height={300} />
    </div>
  );
}

export default SWQICurveChart;