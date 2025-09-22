import { type ReactNode } from "react";
import type { TProjectStatus } from "../interface/Data.interface";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function ProjectsStatusPieChart({
	projectsStatusCategories,
	projectsCount,
}: {
	projectsStatusCategories: {
		category: TProjectStatus;
		count: number;
		color: string;
	}[];
	projectsCount: number;
}): ReactNode {
	return (
		<div className="absolute bg-theme-foreground w-full h-full">
			<p className="absolute left-[50%] top-[50%] -translate-[50%] text-center text-sm leading-4 opacity-70">
				{projectsCount} <br />
				Projects
			</p>
			<ResponsiveContainer height={"100%"} width={"100%"}>
				<PieChart>
					<Pie
						data={projectsStatusCategories}
						dataKey="count"
						nameKey="category"
						cx="50%"
						cy="50%"
						innerRadius="50%"
						outerRadius={"100%"}
						paddingAngle={10}
					>
						{projectsStatusCategories.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={`${entry.color}`}
								strokeWidth={0}
							/>
						))}
					</Pie>
					<Tooltip
						contentStyle={{
							backgroundColor: "#1e293b70",
							border: "1px solid #1e293b50",
							color: "#f8fafc", // ✅ affects default text
							borderRadius: "10px",
						}}
						wrapperStyle={{
							borderRadius: "12px",
						}}
						itemStyle={{
							color: "#ffffff", // ✅ affects value text
						}}
						formatter={(value, _, props) => [
							`${value}`,
							props.payload?.category,
						]}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
