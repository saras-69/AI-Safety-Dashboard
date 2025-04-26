import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { SeverityFilter } from '../types';

const severityOptions = ['All', 'Low', 'Medium', 'High'] as const;

interface FilterControlsProps {
    selectedSeverity: SeverityFilter;
    onSeverityChange: (severity: SeverityFilter) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ selectedSeverity, onSeverityChange }) => {
    return (
        <div className="w-full">
            <label htmlFor="severity-filter" className="block text-sm font-medium text-gray-500 mb-1.5">
                <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-1.5 text-purple-300" />
                    Filter
                </div>
            </label>
            <div className="relative">
                <select
                    id="severity-filter"
                    value={selectedSeverity}
                    onChange={(e) => onSeverityChange(e.target.value as SeverityFilter)}
                    className="block w-full p-2.5 pl-4 pr-10 border border-slate-200 rounded-md focus:ring-1 focus:ring-purple-300 focus:border-purple-300 appearance-none bg-white text-gray-700"
                >
                    {severityOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                    <ChevronDown className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
};

export default FilterControls;
