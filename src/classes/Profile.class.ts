import type {
	IClientProfileView,
	TProfileVisibleTo,
} from "../interface/Data.interface";

interface IPersonalData {
	name: string;
	email: string;
	password: string;
	bio: string;
}

export interface IAccountSettings {
	two_factor_auth: boolean;
	privacy_settings: {
		profile_visible_to: TProfileVisibleTo;
	};
	notification_settings: {
		email: boolean;
		platform: boolean;
	};
}

export class Profile {
	profileView: IClientProfileView;
	protected setClient: React.Dispatch<React.SetStateAction<IClientProfileView>>;

	constructor() {
		this.profileView = {
			client_id: "",
			email: "",
			password: "",
			name: "",
			role: "",
			bio: "",
			account_status: "Verified",
			reviews_and_feedback: [],
			account_settings: {
				two_factor_auth: true,
				privacy_settings: { profile_visible_to: "Everyone" },
				notification_settings: { email: true, platform: true },
			},
		};
		this.setClient = () => {};
	}

	init(
		profileView: IClientProfileView,
		setClient: React.Dispatch<React.SetStateAction<IClientProfileView>>
	) {
		this.setClient = setClient;
		this.profileView = this.getClientProfileViewFromLocalStorage(profileView);
	}

	update(personalData: IPersonalData): void {
		this.profileView = { ...this.profileView, ...personalData };
		localStorage.setItem("personal_data", JSON.stringify(personalData));
		this.setClient(this.profileView);
	}

	updateAccountSettings(accountSettings: IAccountSettings) {
		this.profileView.account_settings = accountSettings;
		localStorage.setItem("account_settings", JSON.stringify(accountSettings));
		this.setClient(this.profileView);
	}

	protected getClientProfileViewFromLocalStorage(
		profileViewData: IClientProfileView
	): IClientProfileView {
		const personaData: IPersonalData = localStorage.getItem("personal_data")
			? JSON.parse(localStorage.getItem("personal_data") as string)
			: {
					name: profileViewData.name,
					email: profileViewData.email,
					password: profileViewData.password,
					bio: profileViewData.bio,
			  };

		const accountSettings: IAccountSettings = localStorage.getItem(
			"account_settings"
		)
			? JSON.parse(localStorage.getItem("account_settings") as string)
			: {
					two_factor_auth: profileViewData.account_settings.two_factor_auth,
					privacy_settings: {
						profile_visible_to:
							profileViewData.account_settings.privacy_settings
								.profile_visible_to,
					},
					notification_settings: {
						email: profileViewData.account_settings.notification_settings.email,
						platform:
							profileViewData.account_settings.notification_settings.platform,
					},
			  };

		localStorage.setItem("personal_data", JSON.stringify(personaData));
		localStorage.setItem("account_settings", JSON.stringify(accountSettings));

		const clientProfileView: IClientProfileView = {
			...profileViewData,
			...personaData,
			...{ account_settings: accountSettings },
		};

		this.setClient(clientProfileView);
		return clientProfileView;
	}
}

export const profileController = new Profile();
