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

export default function DaftarTempahan() {

    const { users, filters } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');

    // Debounced search function
    const updateSearch = useCallback(
        debounce((value) => {
        router.get(route('users.list'), { search: value }, {
            preserveState: true,
            replace: true,
        });
        }, 500),
        []
    );

    // Watch search input changes
    useEffect(() => {
        updateSearch(search);
    }, [search]);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex flex-row gap-4">
                    <div className="basis-3/3 h-fit rounded-xl border p-4 bg-white shadow">
                            
                        <h2 className="text-base/7 font-semibold text-gray-900">Senarai Tempahan</h2>

                        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className="bg-gray-100">
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      {/* row 2 */}
      <tr className="hover:bg-base-300">
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
    </tbody>
  </table>
</div>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search users..."
                            className="border px-3 py-2 rounded-md w-full mb-4"
                        />

                        <table className="min-w-full bg-white border border-gray-300">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Created At</th>
                            </tr>
                            </thead>
                            <tbody>
                                {users.data?.map((user, index) => (
                                    <tr key={user.id} className="border-t">
                                        <td className="px-4 py-2">
                                        {((users.current_page - 1) * users.per_page) + index + 1}
                                        </td>
                                        <td className="px-4 py-2">{user.name}</td>
                                        <td className="px-4 py-2">{user.email}</td>
                                        <td className="px-4 py-2">{user.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-4 flex gap-2 flex-wrap">
                            {users.links.map((link, index) => (
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
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
