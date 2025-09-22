import { useContext, useEffect, useState, type ReactNode } from "react";
import {
	LuArrowLeft,
	LuCheckCheck,
	LuMessageSquare,
	LuSend,
	LuX,
} from "react-icons/lu";
import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";

export default function Chat(): ReactNode {
	const {
		freelancersController,
		chatsController,
		isChatOpen,
		setIsChatOpen,
		profileController,
		chatParticipantId,
		setChatParticipantId,
	} = useContext(Context) as IContext;

	const [selectedChatId, setSelectedChatId] = useState<string>("");

	useEffect(() => {
		if (
			chatParticipantId != "" &&
			chatsController.includeParticipant(chatParticipantId)
		)
			setSelectedChatId(chatsController.getParticipantChat(chatParticipantId));
		else setSelectedChatId("");
	}, [chatParticipantId, chatsController]);

	return (
		<>
			{isChatOpen && (
				<div className="fixed right-0 h-[100dvh] flex flex-col p-4 pl-8 gap-4 z-30">
					<div className="flex flex-col w-[350px] h-[500px] overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-xl">
						<div className="flex glass items-start sticky top-0 w-full z-20 p-2 rounded-t-xl justify-between">
							{selectedChatId == "" && chatParticipantId == "" && (
								<h1 className="flex items-center gap-2 font-semibold text-base pl-2">
									<LuMessageSquare className="text-lg" /> <span>Messages</span>
								</h1>
							)}
							{chatParticipantId != "" && (
								<>
									<div className="flex gap-2 items-start">
										<div
											className="p-1 rounded-full cursor-pointer transition duration-300 hover:bg-white hover:text-gray-900"
											onClick={() => {
												setChatParticipantId("");
											}}
										>
											<LuArrowLeft />
										</div>
										<div className="flex gap-2 items-center">
											<div
												className={`relative flex-none h-8 w-8  p-0.5 rounded-full ${
													freelancersController.getFreelancer(chatParticipantId)
														.is_online
														? "border border-green-400 glass-head-btn"
														: "glass"
												}`}
											>
												<img
													src={
														freelancersController.getFreelancer(
															chatParticipantId
														).profile_pic
													}
													alt={
														freelancersController.getFreelancer(
															chatParticipantId
														).freelancer_id
													}
													loading="lazy"
													className="rounded-full"
												/>
												{freelancersController.getFreelancer(chatParticipantId)
													.is_online && (
													<span className="w-1.5 h-1.5 bg-green-400 absolute rounded-full top-[1px] right-[1px]"></span>
												)}
											</div>
											<div className="">
												<h2 className="text-sm font-semibold">
													{
														freelancersController.getFreelancer(
															chatParticipantId
														).name
													}
												</h2>
												{freelancersController.getFreelancer(chatParticipantId)
													.is_online && (
													<div className="text-green-300 text-xs">
														Active Now
													</div>
												)}
												{!freelancersController.getFreelancer(chatParticipantId)
													.is_online && (
													<div className="opacity-70 text-xs">
														Last seen recently
													</div>
												)}
											</div>
										</div>
									</div>
								</>
							)}
							<div
								className="p-1 glass rounded-full overflow-hidden cursor-pointer"
								onClick={() => {
									setIsChatOpen(false);
								}}
							>
								<LuX />
							</div>
						</div>
						<div
							className={`glass w-full rounded-b-xl p-2 ${
								chatParticipantId != "" ? "flex-1" : ""
							}`}
						>
							<div className="p-2 flex flex-col gap-2">
								{selectedChatId == "" &&
									chatParticipantId == "" &&
									chatsController.chats.length > 0 &&
									chatsController.chats.map((chat, i) => (
										<div
											key={i}
											className="flex gap-4 cursor-pointer items-center"
											onClick={() => setChatParticipantId(chat.participants[1])}
										>
											<div
												className={`relative flex-none h-13 w-13  p-0.5 rounded-full ${
													freelancersController.getFreelancer(
														chat.participants[1]
													).is_online
														? "border border-green-400 glass-head-btn"
														: "glass"
												}`}
											>
												<img
													src={
														freelancersController.getFreelancer(
															chat.participants[1]
														).profile_pic
													}
													alt={
														freelancersController.getFreelancer(
															chat.participants[1]
														).freelancer_id
													}
													loading="lazy"
													className="rounded-full"
												/>
												{freelancersController.getFreelancer(
													chat.participants[1]
												).is_online && (
													<span className="w-2 h-2 bg-green-400 absolute rounded-full top-[3px] right-[3px]"></span>
												)}
											</div>
											<div className="">
												<h2 className="font-semibold">
													{
														freelancersController.getFreelancer(
															chat.participants[1]
														).name
													}
												</h2>
												<p
													className={`line-clamp-1 text-sm ${
														chat.messages[chat.messages.length - 1].is_read
															? "opacity-70"
															: "opacity-100"
													}`}
												>
													{chat.messages[chat.messages.length - 1].content}
												</p>
											</div>
											{chatsController.countUnreadMessages(chat) > 0 && (
												<span className="bg-red-500 w-2 h-2 rounded-full flex-none"></span>
											)}
										</div>
									))}

								{selectedChatId != "" &&
									chatParticipantId != "" &&
									chatsController.includeParticipant(chatParticipantId) && (
										<>
											<div className="flex flex-col items-center">
												<img
													src={
														freelancersController.getFreelancer(
															chatsController.getChat(selectedChatId)
																.participants[1]
														).profile_pic
													}
													alt={
														chatsController.getChat(selectedChatId)
															.participants[1]
													}
													className="w-15 rounded-full"
												/>
												<p className="font-semibold">
													{
														freelancersController.getFreelancer(
															chatsController.getChat(selectedChatId)
																.participants[1]
														).name
													}
												</p>
											</div>
											<div className="flex flex-col gap-4">
												{chatsController
													.getChat(selectedChatId)
													.messages.map((msg, i) => (
														<div
															key={i}
															className={`${
																msg.sender_id ==
																profileController.profileView.client_id
																	? "glass flex justify-end flex-col-reverse self-end p-2 rounded-xl rounded-tl-3xl"
																	: "flex gap-2 glass p-2 rounded-xl rounded-tr-3xl"
															} text-sm max-w-[260px]`}
														>
															{msg.sender_id !=
																profileController.profileView.client_id && (
																<img
																	src={
																		freelancersController.getFreelancer(
																			msg.sender_id
																		).profile_pic
																	}
																	className="w-8 h-8 flex-none rounded-full"
																/>
															)}
															<div className="flex flex-col items-end">
																<p
																	className={`${
																		msg.sender_id ==
																		profileController.profileView.client_id
																			? "text-end"
																			: ""
																	}`}
																>
																	{msg.content}
																</p>
																<div className="flex items-center gap-2">
																	<p className="text-xs opacity-80">
																		{new Date(
																			msg.created_at
																		).toLocaleDateString("en-US", {
																			year: "numeric",
																			month: "short",
																			day: "numeric",
																			hour: "2-digit",
																			minute: "2-digit",
																		})}
																	</p>
																	{msg.sender_id ==
																		profileController.profileView.client_id && (
																		<LuCheckCheck
																			className={`text-lg ${
																				msg.is_read ? "text-green-300" : ""
																			}`}
																		/>
																	)}
																</div>
															</div>
														</div>
													))}
											</div>
										</>
									)}

								{selectedChatId == "" &&
									chatParticipantId != "" &&
									!chatsController.includeParticipant(chatParticipantId) && (
										<div className="py-20 flex flex-col gap-4 items-center">
											<div className="flex flex-col items-center">
												<img
													src={
														freelancersController.getFreelancer(
															chatParticipantId
														).profile_pic
													}
													alt={chatParticipantId}
													className="w-15 rounded-full"
												/>
												<p className="font-semibold">
													{
														freelancersController.getFreelancer(
															chatParticipantId
														).name
													}
												</p>
											</div>
											<p className="text-sm text-center max-w-[280px]">
												The conversation hasn’t started yet. Type your first
												message
											</p>
										</div>
									)}
							</div>
						</div>
						{chatParticipantId != "" && (
							<div className="fixed w-[350px] top-[570px] z-50 p-2">
								<div className="glass flex items-center rounded-full">
									<input
										type="text"
										placeholder="Share your thoughts..."
										className="flex-1 p-2 outline-0 pl-3 text-sm"
									/>
									<div className="p-2 mr-1 cursor-pointer rounded-full transition duration-300 hover:bg-white hover:text-gray-900">
										<LuSend />
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
