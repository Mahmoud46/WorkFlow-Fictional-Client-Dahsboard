import type { IRecentActivityItem } from "../interface/Data.interface";

export function getRecentActivities(
	activities: IRecentActivityItem[],
	currentYear: number = new Date().getFullYear()
): IRecentActivityItem[] {
	const now = new Date();

	const recentActivities: IRecentActivityItem[] = [];

	for (const item of activities) {
		const itemDate = new Date(item.date);
		if (now > itemDate) {
			const [year] = item.date.split("-");
			if (+year == currentYear) {
				recentActivities.push(item);
			}
		}
	}

	return recentActivities;
}
