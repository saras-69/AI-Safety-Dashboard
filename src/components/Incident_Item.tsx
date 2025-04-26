import React from 'react';
import { AlertCircle, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Incident } from '../types';

interface IncidentItemProps {
    incident: Incident;
    isExpanded: boolean;
    onToggleDetails: (id: number) => void;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ incident, isExpanded, onToggleDetails }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">{incident.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${incident.severity === 'High' ? 'bg-red-100 text-orange-600' :
                                incident.severity === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                                    'bg-lime-100 text-lime-600'
                                }`}>
                                <AlertCircle className="w-3 h-3 mr-1" />
                                {incident.severity}
                            </span>
                            <span className="inline-flex items-center text-sm text-gray-500">
                                <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                                {new Date(incident.reportedDate).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => onToggleDetails(incident.id)}
                        className="mt-2 sm:mt-0 flex items-center text-purple-400 hover:text-purple-500 font-medium text-sm focus:outline-none focus:underline"
                    >
                        {isExpanded ? (
                            <>
                                <ChevronUp className="w-4 h-4 mr-1" />
                                Hide Details
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-4 h-4 mr-1" />
                                View Details
                            </>
                        )}
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="px-4 pb-4 pt-1">
                    <div className="border-t border-gray-100 pt-3">
                        <p className="text-gray-600">{incident.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IncidentItem;
