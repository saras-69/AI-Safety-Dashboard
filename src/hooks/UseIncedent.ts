import { useState, useEffect } from 'react';
import { Incident, SeverityFilter, SortOrder } from '../types';
import mockData from '../data/MockData';

const useIncidents = () => {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [filter, setFilter] = useState<SeverityFilter>('All');
    const [sortOrder, setSortOrder] = useState<SortOrder>('Newest First');
    const [expandedIncident, setExpandedIncident] = useState<number | null>(null);

    // Load mock data on initial render
    useEffect(() => {
        setIncidents(mockData.map(incident => ({
            ...incident,
            severity: incident.severity as "Low" | "Medium" | "High"
        })));
    }, []);

    const addIncident = (newIncident: Incident) => {
        setIncidents((prevIncidents) => [...prevIncidents, newIncident]);
    };

    const toggleIncidentDetails = (id: number) => {
        setExpandedIncident(expandedIncident === id ? null : id);
    };

    const filteredIncidents = incidents.filter((incident) => {
        if (filter === 'All') return true;
        return incident.severity === filter;
    });

    const sortedIncidents = [...filteredIncidents].sort((a, b) => {
        if (sortOrder === 'Newest First') {
            return new Date(b.reportedDate).getTime() - new Date(a.reportedDate).getTime();
        } else {
            return new Date(a.reportedDate).getTime() - new Date(b.reportedDate).getTime();
        }
    });

    return {
        incidents: sortedIncidents,
        filter,
        sortOrder,
        expandedIncident,
        addIncident,
        setFilter,
        setSortOrder,
        toggleIncidentDetails,
    };
};

export default useIncidents;