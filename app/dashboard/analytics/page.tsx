import { requireAuth } from '@/lib/auth-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
	title: 'Analytics',
	description: 'Marketplace analytics overview',
};

export default async function AnalyticsPage() {
	await requireAuth();

	return (
		<div className="p-8 space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-foreground">Analytics</h1>
				<p className="text-muted-foreground">Track marketplace performance and trends</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Analytics Dashboard</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						Detailed analytics widgets are coming soon.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
