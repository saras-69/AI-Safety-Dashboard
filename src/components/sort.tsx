import React from 'react';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { SortOrder } from '../types';

const sortOptions = ['Newest First', 'Oldest First'] as const;

interface SortProps {
    selectedSort: SortOrder;
    onSortChange: (sortOrder: SortOrder) => void;
}

const Sort: React.FC<SortProps> = ({ selectedSort, onSortChange }) => {
    return (
        <div className="w-full sm:flex-1">
            <label htmlFor="sort-order" className="block text-sm font-medium text-white mb-1.5">
                <div className="flex items-center">
                    <ArrowUpDown className="h-4 w-4 mr-1.5 text-purple-300" />
                    Sort by Date
                </div>
            </label>
            <div className="relative">
                <select
                    id="sort-order"
                    value={selectedSort}
                    onChange={(e) => onSortChange(e.target.value as SortOrder)}
                    className="block w-full p-2.5 pl-4 pr-10 border border-slate-200 rounded-md focus:ring-1 focus:ring-purple-300 focus:border-purple-300 appearance-none bg-white text-gray-700"
                >
                    {sortOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">

                </div>
            </div>
        </div>
    );
};

export default Sort;
