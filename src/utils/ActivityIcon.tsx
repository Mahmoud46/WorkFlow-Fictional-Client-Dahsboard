import type { ReactNode } from "react";
import type {
	TPaymentMethod,
	TProfileVisibleTo,
	TRecentActivityType,
} from "../interface/Data.interface";
import {
	LuActivity,
	LuCreditCard,
	LuDatabase,
	LuFile,
	LuFileArchive,
	LuFileCode,
	LuFileSpreadsheet,
	LuFileText,
	LuFolderPen,
	LuFolderPlus,
	LuGlobe,
	LuImage,
	LuLock,
	LuMessageSquare,
	LuMusic,
	LuPresentation,
	LuReceipt,
	LuStar,
	LuUsers,
	LuVideo,
} from "react-icons/lu";
import { FaArtstation, FaGlobe } from "react-icons/fa";
import { MdWeb } from "react-icons/md";
import { PiBank } from "react-icons/pi";
import { IoCash } from "react-icons/io5";
import { BiCreditCard } from "react-icons/bi";
import {
	BsBehance,
	BsDribbble,
	BsGithub,
	BsLinkedin,
	BsMedium,
	BsPaypal,
	BsStackOverflow,
	BsTwitterX,
} from "react-icons/bs";

export const ActivityIcon = ({
	type,
	className = "",
}: {
	type: TRecentActivityType;
	className?: string;
}): ReactNode => {
	switch (type) {
		case "ProjectCreated":
			return <LuFolderPlus className={`${className} text-blue-300`} />;
		case "ProjectUpdated":
			return <LuFolderPen className={`${className} text-indigo-300`} />;
		case "PaymentMade":
			return <LuCreditCard className={`${className} text-green-300`} />;
		case "InvoiceReceived":
			return <LuReceipt className={`${className} text-amber-300`} />;
		case "FreelancerReviewed":
			return <LuStar className={`${className} text-yellow-300`} />;
		case "MessageSent":
			return <LuMessageSquare className={`${className} text-purple-300`} />;
		case "Other":
		default:
			return <LuActivity className={`${className} text-gray-300`} />;
	}
};

export const TransferMethodIcon = ({
	method,
	className = "",
}: {
	method: TPaymentMethod;
	className?: string;
}): ReactNode => {
	switch (method) {
		case "Bank Transfer":
			return <PiBank className={className} />;
		case "Cash":
			return <IoCash className={className} />;
		case "Credit Card":
			return <BiCreditCard className={className} />;
		case "PayPal":
			return <BsPaypal className={className} />;
	}
};

export const FileIcon = ({
	fileName,
	className = "",
}: {
	fileName: string;
	className?: string;
}): ReactNode => {
	const ext = fileName.split(".").pop()?.toLowerCase();

	switch (ext) {
		case "pdf":
			return <LuFileText className={`text-red-500 ${className}`} />;
		case "doc":
		case "docx":
			return <LuFileText className={`text-blue-600 ${className}`} />;
		case "xls":
		case "xlsx":
		case "csv":
			return <LuFileSpreadsheet className={`text-green-600 ${className}`} />;
		case "ppt":
		case "pptx":
			return <LuPresentation className={`text-orange-600 ${className}`} />;
		case "png":
		case "jpg":
		case "jpeg":
		case "gif":
			return <LuImage className={`text-purple-600 ${className}`} />;
		case "mp4":
		case "mov":
			return <LuVideo className={`text-indigo-600 ${className}`} />;
		case "mp3":
		case "wav":
			return <LuMusic className={`text-pink-600 ${className}`} />;
		case "zip":
		case "rar":
			return <LuFileArchive className={`text-gray-600 ${className}`} />;
		case "json":
		case "xml":
			return <LuDatabase className={`text-teal-600 ${className}`} />;
		case "js":
		case "ts":
		case "py":
		case "java":
			return <LuFileCode className={`text-yellow-600 ${className}`} />;
		default:
			return <LuFile className={`text-gray-500 ${className}`} />;
	}
};

export const PrivacyIcon = ({
	level,
	className = "",
}: {
	level: TProfileVisibleTo;
	className?: string;
}): ReactNode => {
	switch (level) {
		case "Everyone":
			return <LuGlobe className={className} />;
		case "Freelancers Only":
			return <LuUsers className={className} />;
		case "Private":
			return <LuLock className={className} />;
		default:
			return <LuGlobe className={className} />;
	}
};

type SocialIconProps = {
	platform: string;
	className?: string;
};

export default function SocialIcon({
	platform,
	className,
}: SocialIconProps): ReactNode {
	switch (platform.toLowerCase()) {
		case "linkedin":
			return <BsLinkedin className={className} />;
		case "github":
			return <BsGithub className={className} />;
		case "medium":
			return <BsMedium className={className} />;
		case "artstation":
			return <FaArtstation className={className} />;
		case "dribbble":
			return <BsDribbble className={className} />;
		case "behance":
			return <BsBehance className={className} />;
		case "stack overflow":
			return <BsStackOverflow className={className} />;
		case "twitter (x)":
			return <BsTwitterX className={className} />;
		case "portfolio":
		case "website":
		case "blog":
			return <MdWeb className={className} />;
		default:
			return <FaGlobe className={className} />; // fallback generic icon
	}
}
