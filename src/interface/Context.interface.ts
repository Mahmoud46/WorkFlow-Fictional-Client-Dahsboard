import type { Profile } from "../classes/Profile.class";
import type { Freelancers } from "../classes/Freelancers.class";
import type { Invoices } from "../classes/Invoices.class";
import type { Projects } from "../classes/Projects.class";
import type { Proposals } from "../classes/Proposals.class";
import type { Transactions } from "../classes/Transactions.class";
import type {
	IClientProfileView,
	IFreelancer,
	IProject,
	IRecentActivityItem,
	ITransaction,
} from "./Data.interface";
import type { Chats } from "../classes/Chats.class";
import type { Posts } from "../classes/Posts.clsass";

export interface IContext {
	client: IClientProfileView;
	projects: IProject[];
	setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
	freelancers: IFreelancer[];
	setFreelancers: React.Dispatch<React.SetStateAction<IFreelancer[]>>;
	transactions: ITransaction[];
	setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>;
	recentActivities: IRecentActivityItem[];
	setRecentActivities: React.Dispatch<
		React.SetStateAction<IRecentActivityItem[]>
	>;

	profileController: Profile;
	proposalsController: Proposals;
	projectsController: Projects;
	transactionsController: Transactions;
	invoicesController: Invoices;
	freelancersController: Freelancers;
	postsController: Posts;

	isChatOpen: boolean;
	setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;

	chatsController: Chats;
	chatParticipantId: string;
	setChatParticipantId: React.Dispatch<React.SetStateAction<string>>;
}
