import type { IClientPost } from "../interface/Data.interface";

export class Posts {
	posts: IClientPost[];

	constructor() {
		this.posts = [];
	}

	init(posts: IClientPost[]) {
		this.posts = posts;
	}
}

export const postsController = new Posts();
