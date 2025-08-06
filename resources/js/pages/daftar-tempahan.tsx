import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import HeadingSmall from '@/components/heading-small';
import BorangTempahan from '@/components/borang-tempahan';
import { BookingDatePicker } from '@/components/google-calendar';
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

type Room = {
    id: number;
    name: string;
};

interface Props {
    rooms: Room[];
}

export default function DaftarTempahan({ rooms }: Props) {

    // console.log('Rooms:', rooms);

    // const { rooms } = usePage<{ props: { rooms: Room[] } }>().props;
    // const roomsList = rooms as { id: number, name: string }[];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex flex-row gap-4">
                    <div className="basis-2/3 h-fit sticky top-4 rounded-xl border p-4 bg-white shadow">
                        {/* <BorangTempahan /> */}
                        <BorangTempahan rooms={rooms} />
                    </div>
                    <div className="basis-2/3 h-64 rounded-xl p-4">
                        <BookingDatePicker/>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
