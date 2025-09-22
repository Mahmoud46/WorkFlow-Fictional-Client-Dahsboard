import { useContext, type ReactNode } from "react";
import ProjectsStatusPieChart from "./ProjectsStatusPieChart";
import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";

export default function ProjectsStatusPieChartContainer(): ReactNode {
	const { projectsController } = useContext(Context) as IContext;

	return (
		<>
			<div className="glass flex flex-col p-4 rounded-2xl gap-2">
				<h1 className="text-left w-full font-semibold">Projects Status</h1>
				<p className="text-sm">
					A total of{" "}
					<span className="text-green-300">
						{(
							(projectsController.projectStatusCategoryWithColor[0]?.count /
								projectsController.projects.length) *
							100
						).toFixed(0) ?? "_"}
						%
					</span>{" "}
					of projects have been successfully completed
				</p>
				<div className="flex items-center gap-4 w-full">
					<div className="relative flex-1 max-w-[200px] aspect-[1/1]">
						<ProjectsStatusPieChart
							projectsStatusCategories={
								projectsController.projectStatusCategoryWithColor
							}
							projectsCount={projectsController.projects.length}
						/>
					</div>
					<div className="flex gap-2 items-start flex-col">
						{projectsController.projectStatusCategoryWithColor.map(
							(item, i) => (
								<div key={i} className="flex gap-2 flex-none items-center">
									<span
										style={{ backgroundColor: `${item.color}` }}
										className="w-[10px] h-[10px] rounded-full"
									></span>
									<p className="text-sm opacity-70">
										{item.category}{" "}
										<span>
											{(
												(item?.count / projectsController.projects.length) *
												100
											).toFixed(0) ?? "_"}
											%
										</span>
									</p>
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</>
	);
}
