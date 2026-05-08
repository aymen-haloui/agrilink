import { requireAuth } from '@/lib/auth-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
	title: 'Payments',
	description: 'Payment activity and status',
};

export default async function PaymentsPage() {
	await requireAuth();

	return (
		<div className="p-8 space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-foreground">Payments</h1>
				<p className="text-muted-foreground">Monitor payment transactions and status</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Payment Overview</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						Payment details will appear here once transactions are recorded.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
