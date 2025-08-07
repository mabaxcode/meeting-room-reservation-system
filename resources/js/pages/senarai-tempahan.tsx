import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import HeadingSmall from '@/components/heading-small';
import { usePage } from '@inertiajs/react'; 


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sistem Tempahan Bilik Mesyuarat',
        href: '/dashboard',
    },
    {
        title: 'Daftar Tempahan',
        href: '/dashboard',
    },
];

export default function DaftarTempahan() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex flex-row gap-4">
                    <div className="basis-3/3 h-fit rounded-xl border p-4 bg-white shadow">
                        
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
