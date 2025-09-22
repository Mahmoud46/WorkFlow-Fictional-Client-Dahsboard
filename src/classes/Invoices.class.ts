import type { IInvoice } from "../interface/Data.interface";

export class Invoices {
	invoices: IInvoice[];
	protected indexedInvoices: Record<string, IInvoice>;
	protected invoicesIds: string[];

	constructor() {
		this.invoices = [];
		this.indexedInvoices = {};
		this.invoicesIds = [];
	}

	init(invoices: IInvoice[]) {
		this.invoices = this.invoiceIssued2Now(invoices);
		this.indexedInvoices = this.getIndexedInvoices();
		this.invoicesIds = this.getInvoicesIds();
	}

	protected invoiceIssued2Now(invoices: IInvoice[]): IInvoice[] {
		const invoices2Now: IInvoice[] = [];
		const now = new Date();

		for (const invoice of invoices) {
			const invoiceIssuedDate = new Date(invoice.issue_date);
			if (now > invoiceIssuedDate) {
				invoices2Now.push(invoice);
			}
		}
		return invoices2Now;
	}

	protected getInvoicesIds(): string[] {
		const invoicesIds: string[] = [];
		for (const invoice of this.invoices) invoicesIds.push(invoice.invoice_id);

		return invoicesIds;
	}

	protected getIndexedInvoices(): Record<string, IInvoice> {
		const indexedInvoices: Record<string, IInvoice> = {};
		for (const invoice of this.invoices)
			indexedInvoices[invoice.invoice_id] = invoice;

		return indexedInvoices;
	}

	getInvoice(invoiceId: string): IInvoice {
		return this.indexedInvoices[invoiceId];
	}

	include(invoiceId: string): boolean {
		return this.invoicesIds.includes(invoiceId);
	}
}

export const invoicesController = new Invoices();
