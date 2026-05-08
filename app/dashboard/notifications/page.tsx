import { requireAuth } from '@/lib/auth-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
	title: 'Notifications',
	description: 'Notifications and announcements',
};

export default async function NotificationsPage() {
	await requireAuth();

	return (
		<div className="p-8 space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-foreground">Notifications</h1>
				<p className="text-muted-foreground">Stay up to date with important updates</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Your Notifications</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">No notifications yet.</p>
				</CardContent>
			</Card>
		</div>
	);
}
