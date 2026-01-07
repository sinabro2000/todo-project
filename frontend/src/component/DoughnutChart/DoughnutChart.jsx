import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function DoughnutChart({ todos }) {
    // 완료 / 미완료 개수 계산
    const doneCount = todos.filter((t) => t.done).length;
    const notDoneCount = todos.length - doneCount;
    const total = todos.length;

    // 완료/미완료 비율
    const donePercent = total === 0 ? 0 : Math.round((doneCount / total) * 100);
    const notDonePercent = total === 0 ? 0 : 100 - donePercent;

    const data = {
        labels: ["완료", "미완료"],
        datasets: [
            {
                data: [doneCount, notDoneCount],
                backgroundColor: ["#4caf50", "#f44336"],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            datalabels: {
                color: "#fff",
                font: {
                    weight: "bold",
                    size: 16,
                },
                formatter: (value, context) => {
                    if (context.dataIndex === 0) return `${donePercent}%`;
                    if (context.dataIndex === 1) return `${notDonePercent}%`;
                    return "";
                },
            },
            legend: {
                position: "bottom",
            },
        },
    };

    return (
        <div style={{ width: "260px", margin: "0 auto", textAlign: "center" }}>
            <h3>오늘의 성취도</h3>
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default DoughnutChart;