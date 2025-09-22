import { useEffect, useState, type ReactNode } from "react";
import { Context } from "./Context";
import type { IContext } from "../interface/Context.interface";
import type {
	IChat,
	IClientProfileView,
	IFreelancer,
	IInvoice,
	IProject,
	IProposal,
	IRecentActivityItem,
	ITransaction,
} from "../interface/Data.interface";
import clientData from "../data/client.json";
import projectsData from "../data/projects.json";
import freelancersData from "../data/freelancers.json";
import transactionsData from "../data/transactions.json";
import proposalsData from "../data/pending_proposals.json";
import recentActivitiesData from "../data/recent_activity.json";
import invoicesData from "../data/invoices.json";
import chatsData from "../data/chats.json";
//
import { freelancersController } from "../classes/Freelancers.class";
import { projectsController } from "../classes/Projects.class";
import { invoicesController } from "../classes/Invoices.class";
import { transactionsController } from "../classes/Transactions.class";
import { proposalsController } from "../classes/Proposals.class";
import { profileController } from "../classes/Profile.class";
import { chatsController } from "../classes/Chats.class";

export default function ContextProvider({
	children,
}: {
	children: ReactNode;
}): ReactNode {
	const [client, setClient] = useState<IClientProfileView>(
		clientData as IClientProfileView
	);
	const [projects, setProjects] = useState<IProject[]>([]);
	const [freelancers, setFreelancers] = useState<IFreelancer[]>([]);
	const [transactions, setTransactions] = useState<ITransaction[]>([]);
	const [recentActivities, setRecentActivities] = useState<
		IRecentActivityItem[]
	>([]);
	const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
	const [chatParticipantId, setChatParticipantId] = useState<string>("");

	useEffect(() => {
		setProjects(projectsData.projects as IProject[]);
		setFreelancers(freelancersData.freelancers as unknown as IFreelancer[]);
		setTransactions(transactionsData.transactions as ITransaction[]);
		setRecentActivities(
			recentActivitiesData.recent_activities as IRecentActivityItem[]
		);

		profileController.init(clientData as IClientProfileView, setClient);
		proposalsController.init(proposalsData as IProposal[]);
		freelancersController.init(freelancersData.freelancers as IFreelancer[]);
		projectsController.init(projectsData.projects as IProject[]);
		transactionsController.init(
			transactionsData.transactions as ITransaction[]
		);
		invoicesController.init(invoicesData.invoices as IInvoice[]);

		chatsController.init(chatsData as IChat[]);
	}, []);

	const contextValue: IContext = {
		client,
		projects,
		setProjects,
		freelancers,
		setFreelancers,
		transactions,
		setTransactions,
		recentActivities,
		setRecentActivities,

		profileController,
		projectsController,
		transactionsController,
		invoicesController,
		freelancersController,
		proposalsController,
		chatsController,

		isChatOpen,
		setIsChatOpen,
		chatParticipantId,
		setChatParticipantId,
	};

	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
