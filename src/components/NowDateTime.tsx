import { useEffect, useState, type ReactNode } from "react";
import { getFormattedDateTime } from "../utils/date";
import { LuCalendarClock } from "react-icons/lu";

export default function NowDateTime(): ReactNode {
	const [now, setNow] = useState<{
		time: string;
		monthName: string;
		dayNum: string;
		year: string;
		dayName: string;
	}>();

	useEffect(() => {
		const timeInterval = setInterval(() => {
			setNow(getFormattedDateTime());
		}, 3000);
		return () => clearInterval(timeInterval);
	});
	return (
		<>
			{now && (
				<div className="flex gap-4 items-center glass glass rounded-2xl p-2 overflow-hidden">
					<LuCalendarClock className="text-3xl" />
					<div className="">
						<p className="text-sm opacity-70">{now.dayName}</p>
						<p className="text-3xl font-light">{now.time}</p>
						<p className="font-light opacity-80 text-sm">
							{now.monthName} {now.dayNum} {now.year}
						</p>
					</div>
				</div>
			)}
		</>
	);
}
