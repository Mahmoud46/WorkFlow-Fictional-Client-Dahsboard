import type { IFreelancer } from "../interface/Data.interface";

export class Freelancers {
	freelancers: IFreelancer[];
	protected indexedFreelancers: Record<string, IFreelancer>;
	protected freelancersIds: string[];

	constructor() {
		this.freelancers = [];
		this.indexedFreelancers = {};
		this.freelancersIds = [];
	}

	init(freelancers: IFreelancer[]) {
		this.freelancers = freelancers;
		this.indexedFreelancers = this.getIndexedFreelancers();
		this.freelancersIds = this.getFreelancersIds();
	}

	protected getIndexedFreelancers(): Record<string, IFreelancer> {
		const indexedFreelancers: Record<string, IFreelancer> = {};
		for (const freelancer of this.freelancers)
			indexedFreelancers[freelancer.freelancer_id] = freelancer;
		return indexedFreelancers;
	}

	protected getFreelancersIds(): string[] {
		const freelancersIds: string[] = [];

		for (const freelancer of this.freelancers)
			freelancersIds.push(freelancer.freelancer_id);

		return freelancersIds;
	}

	getFreelancer(freelancerId: string): IFreelancer {
		return this.indexedFreelancers[freelancerId];
	}

	include(freelancerId: string): boolean {
		return this.freelancersIds.includes(freelancerId);
	}
}

export const freelancersController = new Freelancers();
