import React from 'react';
import { Frown } from 'lucide-react';
import IncidentItem from './Incident_Item';
import { Incident } from '../types';

interface IncidentListProps {
    incidents: Incident[];
    expandedIncident: number | null;
    onToggleDetails: (id: number) => void;
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents, expandedIncident, onToggleDetails }) => {
    if (incidents.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-purple-200">
                <Frown className="h-12 w-12 mx-auto text-purple-300" />
                <p className="mt-4 text-gray-500">No incidents found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {incidents.map((incident) => (
                <IncidentItem
                    key={incident.id}
                    incident={incident}
                    isExpanded={expandedIncident === incident.id}
                    onToggleDetails={onToggleDetails}
                />
            ))}
        </div>
    );
};

export default IncidentList;
