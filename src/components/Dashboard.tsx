import React, { useState } from 'react';
import { AlertTriangle, Plus, X, AlertCircle, BookOpen, AlertOctagon, AlertCircleIcon, List, Filter, Mail } from 'lucide-react';
import IncidentList from './Incident_List';
import FilterControls from './Filter';
import Sort from './sort';
import IncidentForm from './Form';
import useIncidents from '../hooks/UseIncedent';
import { Incident } from '../types';
import Iridescence from './Iridescence';

const Dashboard: React.FC = () => {
    const {
        incidents,
        filter,
        sortOrder,
        expandedIncident,
        addIncident,
        setFilter,
        setSortOrder,
        toggleIncidentDetails
    } = useIncidents();

    const [showForm, setShowForm] = useState(false);

    const handleAddIncident = (formData: Omit<Incident, 'id' | 'reportedDate'>) => {
        const newIncident: Incident = {
            id: Math.max(0, ...incidents.map(i => i.id)) + 1,
            title: formData.title,
            description: formData.description,
            severity: formData.severity,
            reportedDate: new Date()
        };

        addIncident(newIncident);
        setShowForm(false);
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Iridescence Background */}
            <div className="absolute inset-0 w-full h-full z-0 ">
                <Iridescence
                    isRotate={true}
                    mouseInteraction={true}
                    pixelFilter={700}
                />

            </div>
            <div className="relative z-10 min-h-screen p-4 sm:p-6">
                <div className="max-w-6xl mx-auto">
                    <header className="bg-black/40 backdrop-blur-md rounded-xl shadow-sm p-6 mb-6 border-l-4 border-black-300">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="bg-purple-100/50 backdrop-blur-sm p-3 rounded-lg mr-4">
                                    <AlertTriangle className="h-8 w-8 text-purple-500" />
                                </div>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-white">AI Safety Dashboard</h1>
                                    <p className="text-black-200 text-sm">Report Your Incidents Here</p>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-red-500/30 backdrop-blur-md rounded-lg p-4 shadow-sm border-t-4 border-red-500">
                            <div className="flex items-center gap-2">
                                <AlertOctagon className="h-5 w-5 text-red-400" />
                                <h3 className="text-white text-sm font-medium">High</h3>
                            </div>
                            <p className="text-2xl font-bold text-white mt-1">
                                {incidents.filter(i => i.severity === 'High').length}
                            </p>
                        </div>
                        <div className="bg-yellow-500/20 backdrop-blur-md rounded-lg p-4 shadow-sm border-t-4 border-yellow-300">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-yellow-300" />
                                <h3 className="text-white  text-sm font-medium">Medium</h3>
                            </div>
                            <p className="text-2xl font-bold text-white mt-1">
                                {incidents.filter(i => i.severity === 'Medium').length}
                            </p>
                        </div>
                        <div className="bg-green-400/20 backdrop-blur-md rounded-lg p-4 shadow-sm border-t-4 border-lime-300">
                            <div className="flex items-center gap-2">
                                <AlertCircleIcon className="h-5 w-5 text-lime-300" />
                                <h3 className="text-white text-sm font-medium">Low</h3>
                            </div>
                            <p className="text-2xl font-bold text-white mt-1">
                                {incidents.filter(i => i.severity === 'Low').length}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-1/4">
                            <div className="bg-black/40 backdrop-blur-md rounded-lg shadow-sm p-4 sticky top-4">
                                <h2 className="text-lg font-semibold mb-4 text-white border-b border-white/20 pb-2 flex items-center gap-2">
                                    <Filter className="h-5 w-5 text-purple-300" />
                                    Incident Controls
                                </h2>

                                <FilterControls selectedSeverity={filter} onSeverityChange={setFilter} />
                                <Sort selectedSort={sortOrder} onSortChange={setSortOrder} />

                                <button
                                    onClick={() => setShowForm(!showForm)}
                                    className={`w-full mt-4 px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${showForm ? 'bg-gray-100/30 backdrop-blur-sm text-white hover:bg-gray-200/40' : 'bg-purple-500/70 backdrop-blur-sm text-white hover:bg-purple-600/80'}`}
                                >
                                    {showForm ? (
                                        <>
                                            <X className="h-5 w-5" />
                                            Cancel Report
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="h-5 w-5" />
                                            New Incident Report
                                        </>
                                    )}
                                </button>

                                <div className="mt-6">
                                    <h3 className="text-white text-sm font-medium mb-2 flex items-center gap-2">
                                        <List className="h-4 w-4" />
                                        Recent Activity
                                    </h3>
                                    <div className="space-y-3">
                                        {incidents.slice(0, 3).map(incident => (
                                            <div key={incident.id} className="text-sm text-white/80 flex items-start gap-2">
                                                <span className={`inline-block h-2 w-2 rounded-full mt-1.5 ${incident.severity === 'High' ? 'bg-red-400' :
                                                    incident.severity === 'Medium' ? 'bg-yellow-300' : 'bg-lime-300'
                                                    }`}></span>
                                                <span className="truncate">{incident.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-3/4">
                            {showForm && (
                                <div className="bg-black/10 backdrop-blur-md rounded-lg shadow-sm mb-6 border border-white/20">
                                    <IncidentForm
                                        onSubmit={handleAddIncident}
                                        onCancel={() => setShowForm(false)}
                                    />
                                </div>
                            )}
                            <div className="bg-black/20 backdrop-blur-md rounded-lg shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-white/20 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-purple-300" />
                                        Incident Reports
                                    </h2>
                                    <span className="bg-purple-500/30 backdrop-blur-sm text-white text-xs font-medium rounded-full px-3 py-1">
                                        {incidents.length} {incidents.length === 1 ? 'incident' : 'incidents'}
                                    </span>
                                </div>

                                <IncidentList
                                    incidents={incidents}
                                    expandedIncident={expandedIncident}
                                    onToggleDetails={toggleIncidentDetails}
                                />
                            </div>
                        </div>
                    </div>
                    <footer className="mt-8 text-center text-white/80 text-sm">
                        <p>
                            AI Safety Dashboard • Created by Saraswati Chandra
                        </p>
                        <div className="flex items-center justify-center gap-4 mt-2">
                            <a href="https://www.linkedin.com/in/saraswati-chandra069" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path></svg>
                            </a>
                            <a href="https://github.com/saras-69" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"></path></svg>
                            </a>
                            <a href="mailto:saketsingh102003@gmail.com" className="text-white/70 hover:text-white transition-colors">
                                <Mail className="h-4 w-4" />
                            </a>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;