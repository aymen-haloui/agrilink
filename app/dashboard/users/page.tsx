import { requireRole } from '@/lib/auth-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
	title: 'Users',
	description: 'User management workspace',
};

export default async function UsersPage() {
	await requireRole('ADMIN', 'OPERATOR');

	return (
		<div className="p-8 space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-foreground">Users</h1>
				<p className="text-muted-foreground">Manage platform users and permissions</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>User Management</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						User administration tools will be available here.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
