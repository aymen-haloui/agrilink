import { requireAuth } from '@/lib/auth-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
	title: 'Settings',
	description: 'Account and platform settings',
};

export default async function SettingsPage() {
	await requireAuth();

	return (
		<div className="p-8 space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-foreground">Settings</h1>
				<p className="text-muted-foreground">Manage account and application preferences</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Configuration</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">Settings options are coming soon.</p>
				</CardContent>
			</Card>
		</div>
	);
}
