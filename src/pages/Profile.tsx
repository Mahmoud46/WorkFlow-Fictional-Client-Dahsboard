import { useContext, type ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";
import type { IContext } from "../interface/Context.interface";
import { Context } from "../context/Context";
import {
	LuBadgeCheck,
	LuBuilding,
	LuContact,
	LuGlobe,
	LuLanguages,
	LuMail,
	LuMapPin,
	LuPhone,
	LuUserCog,
	LuUserPen,
} from "react-icons/lu";

export default function Profile(): ReactNode {
	const { profileController } = useContext(Context) as IContext;

	return (
		<>
			<div className="gap-4 flex-col glass rounded-2xl flex w-full p-4 min-h-[85dvh]">
				<div className="flex justify-between">
					<div className="flex gap-4">
						<div className="w-22 h-22 flex-none">
							<img
								src={profileController.profileView.profile_pic}
								alt={profileController.profileView.name}
								loading="lazy"
								className="w-full rounded-full"
							/>
						</div>
						<div className="">
							<h1 className="text-2xl flex items-start gap-2">
								<span>{profileController.profileView.name}</span>
								{profileController.profileView.account_status == "Verified" && (
									<LuBadgeCheck className="text-2xl text-green-400" />
								)}
							</h1>
							<p className="text-lg mb-2">
								{profileController.profileView.role}
							</p>
							<p className="text-base max-w-[700px] mb-2">
								{profileController.profileView.bio}
							</p>
							<div className="flex gap-4 items-center text-sm">
								<p className="flex gap-2 items-center">
									<LuBuilding className="flex-none text-base" />{" "}
									<span>{profileController.profileView.company}</span>
								</p>
								<p className="flex gap-2 items-center">
									<LuMapPin className="flex-none text-base" />{" "}
									<span>{profileController.profileView.location}</span>
								</p>
							</div>
							<div className="flex gap-2 mt-4">
								<Link
									to={`/profile/${profileController.profileView.client_id}/edit`}
									className="flex items-center gap-2 glass p-0.5 px-2 rounded-full text-sm"
								>
									<LuUserPen className="text-base" />
									<span>Edit</span>
								</Link>
								<Link
									to={`/profile/${profileController.profileView.client_id}/settings`}
									className="flex items-center gap-2 p-0.5 px-2 rounded-full text-sm bg-white text-gray-900 cursor-pointer"
								>
									<LuUserCog className="text-base" />
									<span>Settings</span>
								</Link>
							</div>
						</div>
					</div>
					<div className="flex gap-4 flex-col flex-1">
						<div className="">
							<div className="flex gap-2 font-semibold items-center mb-1">
								<LuLanguages />
								<h1>Languages Spoken</h1>
							</div>
							<p className="pl-6 text-sm">
								{profileController.profileView.languages_spoken?.join(", ")}
							</p>
						</div>
						<div className="">
							<h1 className="flex items-center font-semibold gap-2 mb-1">
								<LuContact />
								<span>Contacts</span>
							</h1>
							<div className="text-sm pl-6">
								{profileController.profileView.phone_number && (
									<p className="flex items-center gap-2">
										<LuPhone />
										<a
											href={`tel:${profileController.profileView.phone_number.replace(
												/[^\d+]/g,
												""
											)}`}
										>
											{profileController.profileView.phone_number}
										</a>
									</p>
								)}
								<p className="flex items-center gap-2">
									<LuMail />
									<a href={`mailto:${profileController.profileView.email}`}>
										{profileController.profileView.email}
									</a>
								</p>
								<p className="flex items-center gap-2">
									<LuGlobe />
									<a href={profileController.profileView.website}>
										{profileController.profileView.website}
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Outlet />
		</>
	);
}
