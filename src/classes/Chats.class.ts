import type { IChat } from "../interface/Data.interface";

export class Chats {
	chats: IChat[];
	protected indexedChats: Record<string, IChat>;
	protected participantsIndexedChats: Record<string, string>;

	constructor() {
		this.chats = [];
		this.indexedChats = {};
		this.participantsIndexedChats = {};
	}

	init(chats: IChat[]) {
		this.chats = chats;
		this.indexedChats = this.getIndexedChats();
		this.participantsIndexedChats = this.getParticipantsIndexedChats();
	}

	protected getIndexedChats(): Record<string, IChat> {
		const indexedChats: Record<string, IChat> = {};
		for (const chat of this.chats) indexedChats[chat.chat_id] = chat;

		return indexedChats;
	}

	protected getParticipantsIndexedChats(): Record<string, string> {
		const participantsIndexedChats: Record<string, string> = {};
		for (const chat of this.chats)
			participantsIndexedChats[chat.participants[1]] = chat.chat_id;

		return participantsIndexedChats;
	}

	getChat(chatId: string): IChat {
		return this.indexedChats[chatId];
	}

	countUnreadMessages(chat: IChat): number {
		let unreadMessagesCount: number = 0;

		for (const message of chat.messages)
			if (!message.is_read) unreadMessagesCount += 1;
		return unreadMessagesCount;
	}

	includeParticipant(participantId: string): boolean {
		return participantId in this.participantsIndexedChats;
	}

	getParticipantChat(participantId: string): string {
		return this.participantsIndexedChats[participantId];
	}
}

export const chatsController = new Chats();
