import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import HeadingSmall from '@/components/heading-small';
import { usePage } from '@inertiajs/react'; 
import React, { useEffect, useState, useCallback } from 'react';
import { router } from '@inertiajs/react';
import debounce from 'lodash.debounce';
import dayjs from 'dayjs';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PaperClipIcon } from '@heroicons/react/20/solid'


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sistem Tempahan Bilik Mesyuarat',
        href: '/dashboard',
    },
    {
        title: 'Senarai Tempahan',
        href: '/dashboard',
    },
];

export default function SenaraiTempahan() {

    // const { users, filters } = usePage().props;
    const { reservations, filters } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [open, setOpen] = useState(false)
    const [selectedReservation, setSelectedReservation] = useState(null)

    const handleView = (reservation) => {
        setSelectedReservation(reservation)
        setOpen(true)
    }

    const statusStyles = {
        pending: 'bg-yellow-50 text-yellow-700 ring-yellow-600/10',
        approved: 'bg-green-50 text-green-700 ring-green-600/10',
        reject: 'bg-red-50 text-red-700 ring-red-600/10',
    };


    // Debounced search function
    const updateSearch = useCallback(
        debounce((value) => {
        router.get(route('reservation.list'), { search: value }, {
            preserveState: true,
            replace: true,
        });
        }, 500),
        []
    );

    // Watch search input changes
    // useEffect(() => {
    //     updateSearch(search);
    // }, [search]);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex flex-row gap-4">
                    <div className="basis-3/3 h-fit rounded-xl border p-4 bg-white shadow">
                            
                        <h2 className="text-base/7 font-semibold text-gray-900">Senarai Tempahan</h2>

                        {/* <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Carian bilik mesyuarat ..."
                            className="border px-3 py-2 rounded-md w-full mb-4"
                        /> */}
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                updateSearch(e.target.value);
                            }}
                            placeholder="Carian..."
                            className="border px-3 py-1 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-gray-200 transition duration-200 ease-in-out"
                        />


                        <table className="table table-zebra">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">#</th>
                                <th className="px-4 py-2 text-left">Tujuan</th>
                                {/* <th className="px-4 py-2 text-left">Agenda</th> */}
                                <th className="px-4 py-2 text-left">Bilik Mesyuarat</th>
                                <th className="px-4 py-2 text-left">Tarikh Mula</th>
                                <th className="px-4 py-2 text-left">Tarikh Tamat</th>
                                <th className="px-4 py-2 text-left">Tarikh Tempah</th>
                                <th className="px-4 py-2 text-left">Tempahan Oleh</th>
                                {/* <th className="px-4 py-2 text-left">Catatan</th> */}
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left"></th>
                            </tr>
                            </thead>
                            <tbody>
                                {reservations.data?.map((reservation, index) => (
                                    <tr key={reservation.id} className="border-t">
                                        <td className="px-4 py-2">
                                        {((reservations.current_page - 1) * reservations.per_page) + index + 1}
                                        </td>
                                        <td className="px-4 py-2">{reservation.title}</td>
                                        <td className="px-4 py-2">{reservation.room?.name}</td>
                                        <td className="px-4 py-2">{dayjs(reservation.start_time).format('D/M/YYYY hh:mm A')}</td>
                                        <td className="px-4 py-2">{dayjs(reservation.end_time).format('D/M/YYYY hh:mm A')}</td>
                                        <td className="px-4 py-2">{dayjs(reservation.created_at).format('D/M/YYYY')}</td>
                                        <td className="px-4 py-2">{reservation.user?.name}</td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[reservation.status] || ''}`}
                                            >
                                                {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                            onClick={() => handleView(reservation)}
                                            className="btn btn-primary btn-xs"
                                            >
                                            Lihat
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* <div className="mt-4 flex gap-2 flex-wrap">
                            {reservations.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                                className={`px-3 py-1 rounded ${
                                link.active ? 'bg-blue-600 text-white' : 'bg-gray-200'
                                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                            ))}
                        </div>
                         */}

                        <div className="mt-4">
                            <Pagination>
                                <PaginationContent>
                                    {/* Previous */}
                                    <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                        e.preventDefault();
                                        if (reservations.prev_page_url) router.visit(reservations.prev_page_url);
                                        }}
                                        className={`hover:bg-gray-100 ${
                                            !reservations.prev_page_url ? "pointer-events-none opacity-50" : ""
                                        }`}
                                    />
                                    </PaginationItem>

                                    {/* Page Numbers */}
                                    {reservations.links
                                    .filter(link => !link.label.includes("Previous") && !link.label.includes("Next"))
                                    .map((link, index) => (
                                        <PaginationItem key={index}>
                                        {link.label.includes("...") ? (
                                            <PaginationEllipsis />
                                        ) : (
                                            <PaginationLink
                                            href="#"
                                            isActive={link.active}
                                            className={`hover:bg-gray-100transition-colors duration-200
                                                ${link.active ? "bg-gray-100 text-black" : ""}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (link.url) router.visit(link.url);
                                            }}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )}
                                        </PaginationItem>
                                    ))}


                                    {/* Next */}
                                    <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                        e.preventDefault();
                                        if (reservations.next_page_url) router.visit(reservations.next_page_url);
                                        }}
                                        // className={!reservations.next_page_url ? "pointer-events-none opacity-50" : ""}
                                        className={`hover:bg-gray-100 ${
                                            !reservations.next_page_url ? "pointer-events-none opacity-50" : ""
                                        }`}
                                    />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>

                        {/* Modal */}
                        <Dialog open={open} onOpenChange={setOpen}>

                            {/* {selectedReservation && (
                                <div className="space-y-2">
                                <p><strong>Title:</strong> {selectedReservation.title}</p>
                                <p><strong>Room:</strong> {selectedReservation.room?.name}</p>
                                <p><strong>Start Time:</strong> {dayjs(selectedReservation.start_time).format('D/M/YYYY hh:mm A')}</p>
                                <p><strong>End Time:</strong> {dayjs(selectedReservation.end_time).format('D/M/YYYY hh:mm A')}</p>
                                <p><strong>Created At:</strong> {dayjs(selectedReservation.created_at).format('D/M/YYYY')}</p>
                                <p><strong>User:</strong> {selectedReservation.user?.name}</p>
                                <p><strong>Status:</strong> {selectedReservation.status}</p>
                                </div>
                            )} */}


                          
                            <DialogContent className="sm:max-w-[700px]">
                            <DialogHeader>
                                <DialogTitle>Maklumat Tempahan</DialogTitle>
                                <DialogDescription>
                                Berikut merupakan maklumat tempahan bilik mesyuarat.
                                </DialogDescription>
                            </DialogHeader>

                            {selectedReservation && (
                            <div className="grid gap-4">
                                <dl className="divide-y divide-gray-100">
                                    <div className="grid gap-1">
                                        <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Tajuk</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedReservation.title}</dd>
                                        </div>
                                    </div>
                                    <div className="grid gap-1">
                                        <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Agenda Mesyuarat</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedReservation.purpose}</dd>
                                        </div>
                                    </div>
                                    <div className="grid gap-1">
                                        <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Bilik Mesyuarat</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedReservation.room?.name}</dd>
                                        </div>
                                    </div>
                                    <div className="grid gap-1">
                                        <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Tarikh Mula</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{dayjs(selectedReservation.start_time).format('D/M/YYYY hh:mm A')}</dd>
                                        </div>
                                    </div>
                                    <div className="grid gap-1">
                                        <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Tarikh Tamat</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{dayjs(selectedReservation.end_time).format('D/M/YYYY hh:mm A')}</dd>
                                        </div>
                                    </div>
                                    <div className="grid gap-1">
                                        <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Tarikh Tempah</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{dayjs(selectedReservation.created_at).format('D/M/YYYY')}</dd>
                                        </div>
                                    </div>
                                    <div className="grid gap-1">
                                        <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Tempahan Oleh</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedReservation.user?.name}</dd>
                                        </div>
                                    </div>
                                    <div className="grid gap-1">
                                        <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Catatan</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedReservation.remark}</dd>
                                        </div>
                                    </div>
                                    <div className="grid gap-1">
                                        <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Status</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <span
                                                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                                                statusStyles[selectedReservation.status.toLowerCase()] || "bg-gray-50 text-gray-800 ring-gray-500/20"
                                                }`}
                                            >
                                                {selectedReservation.status.charAt(0).toUpperCase() + selectedReservation.status.slice(1)}
                                            </span>
                                            </dd>
                                        </div>
                                    </div>
                                </dl>
                            </div>
                            )}
                            
                            {/* <DialogFooter>
                                <DialogClose asChild>
                                <Button variant="outline">Tutup</Button>
                                </DialogClose>
                            </DialogFooter> */}
                            </DialogContent>
                    

                        </Dialog>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
