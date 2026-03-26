import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { BeeStore } from './data/bee-store';
import { SupabaseStore } from './data/supabase-store';

function redirectWithFlash(router: Router, message: string) {
	localStorage.setItem('beez-flash-message', message);
	return router.createUrlTree(['/']);
}

const validApiaryGuard: CanActivateFn = (route) => {
	const store = inject(BeeStore);
	const supabaseStore = inject(SupabaseStore);
	const router = inject(Router);

	// Apiary lists can be Supabase-backed and not present in BeeStore.
	if (supabaseStore.isConfigured()) return true;

	const apiaryId = route.params['apiaryId'] as string;
	const exists = store.getData().apiaries.some((a) => a.id === apiaryId);
	return exists ? true : redirectWithFlash(router, 'Apiary not found.');
};

const validHiveGuard: CanActivateFn = (route) => {
	const store = inject(BeeStore);
	const supabaseStore = inject(SupabaseStore);
	const router = inject(Router);

	// Inspection lists can be Supabase-backed and not present in BeeStore.
	if (supabaseStore.isConfigured()) return true;

	const apiaryId = route.params['apiaryId'] as string;
	const hiveId = route.params['hiveId'] as string;
	const data = store.getData();
	const apiaryExists = data.apiaries.some((a) => a.id === apiaryId);
	const hiveExists = data.hives.some((h) => h.id === hiveId && h.apiaryId === apiaryId);
	return apiaryExists && hiveExists ? true : redirectWithFlash(router, 'Hive not found for this apiary.');
};

const requireAuthGuard: CanActivateFn = async (_route, state) => {
	const supabaseStore = inject(SupabaseStore);
	const router = inject(Router);

	if (!supabaseStore.isConfigured()) return true;

	try {
		const hasSession = await supabaseStore.hasActiveSession();
		if (hasSession) return true;
		return router.createUrlTree(['/auth'], { queryParams: { redirect: state.url } });
	} catch {
		return router.createUrlTree(['/auth'], { queryParams: { redirect: state.url } });
	}
};

export const routes: Routes = [
	{
		path: 'auth',
		loadComponent: () => import('./pages/auth/auth').then((m) => m.AuthPage)
	},
	{
		path: '',
		canActivate: [requireAuthGuard],
		loadComponent: () => import('./pages/apiary-list/apiary-list').then((m) => m.ApiaryListPage)
	},
	{
		path: 'apiary/:apiaryId',
		canActivate: [requireAuthGuard, validApiaryGuard],
		loadComponent: () => import('./pages/hive-list/hive-list').then((m) => m.HiveListPage)
	},
	{
		path: 'apiary/:apiaryId/hive/:hiveId',
		canActivate: [requireAuthGuard, validHiveGuard],
		loadComponent: () => import('./pages/inspection-list/inspection-list').then((m) => m.InspectionListPage)
	},
	{
		path: 'settings',
		canActivate: [requireAuthGuard],
		loadComponent: () => import('./pages/settings/settings').then((m) => m.SettingsPage)
	}
];
