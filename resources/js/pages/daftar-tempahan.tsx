import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import HeadingSmall from '@/components/heading-small';
import BorangTempahan from '@/components/borang-tempahan';
import Calendar from '@/components/reservation-calendar';
import { usePage } from '@inertiajs/react'; 
// import Calendar from './calendar';


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

type Room = {
    id: number;
    name: string;
};

type Reservation = {
    id: number;
    title: string | null;
    purpose: string;
    remark: string | null;
    start_time: string; // ISO format: "2025-08-07 09:00:00"
    end_time: string;   // ISO format: "2025-08-07 10:00:00"
    status: 'pending' | 'approved' | 'rejected'; // adjust if needed
    user_id: number;
    meeting_room_id: number;
    created_at: string; // ISO datetime
    updated_at: string; // ISO datetime
    room: Room; // nested object
};


interface Props {
    rooms: Room[];
    reservations: Reservation[]
}

export default function DaftarTempahan({ rooms, reservations }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex flex-row gap-4">
                    <div className="basis-1/3 h-fit sticky top-4 rounded-xl border p-4 bg-white shadow">
                        <BorangTempahan rooms={rooms} />
                    </div>
                    <div className="basis-3/3 h-64 rounded-xl p-4">
                        <Calendar reservations={reservations} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
