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
        <div className="bg-black/20 backdrop-blur-md rounded-lg border border-white/30 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden mb-3">
            <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                        <h3 className="text-lg font-semibold text-white">{incident.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${incident.severity === 'High' ? 'bg-red-500/40 text-red-100' :
                                incident.severity === 'Medium' ? 'bg-yellow-500/40 text-yellow-100' :
                                    'bg-lime-500/40 text-lime-100'
                                } backdrop-blur-sm`}>
                                <AlertCircle className="w-3 h-3 mr-1" />
                                {incident.severity}
                            </span>
                            <span className="inline-flex items-center text-sm text-white/80">
                                <Calendar className="w-4 h-4 mr-1 text-white/60" />
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
                        className="mt-2 sm:mt-0 flex items-center text-purple-300 hover:text-purple-200 font-medium text-sm focus:outline-none focus:underline transition-colors"
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
                    <div className="border-t border-white/20 pt-3">
                        <p className="text-white/90">{incident.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IncidentItem;