import React, { useEffect, useState, useCallback } from 'react';
import { usePage, router } from '@inertiajs/react';
import debounce from 'lodash.debounce';

export default function Index() {
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      {/* 🔍 Debounced Search Input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
        className="border px-3 py-2 rounded-md w-full mb-4"
      />

      {/* 📄 Table */}
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

      {/* 📚 Pagination */}
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
  );
}
