import { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";


// 더미 데이터
const data = [
    {
        name: '1월',
        num: 4,
        fail: 5
    },
    {
        name: '2월',
        num: 10,
        fail: 2
    },
];

export default class BarChartCompoent extends PureComponent {

    render() {
        return (
            <BarChart width={500} height={200} data={data}>
                <Bar 
                dataKey="num" 
                fill="#c0bcffff" 
                />
                <Bar 
                dataKey="fail" 
                fill="#ff9f9fff" 
                />
                <XAxis dataKey="name" />
                <YAxis />
            </BarChart>
        );
    }
}