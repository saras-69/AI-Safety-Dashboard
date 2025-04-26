import React, { useState } from 'react';
import { AlertTriangle, Plus, X, AlertCircle, BookOpen, AlertOctagon, AlertCircleIcon, List, Filter, Linkedin, Github, Mail } from 'lucide-react';
import IncidentList from './Incident_List';
import FilterControls from './Filter';
import Sort from './sort';
import IncidentForm from './Form';
import useIncidents from '../hooks/UseIncedent';
import { Incident } from '../types';

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
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-4 sm:p-6">
            <div className="max-w-6xl mx-auto">
                <header className="bg-white rounded-xl shadow-sm p-6 mb-6 border-l-4 border-purple-300">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                <AlertTriangle className="h-8 w-8 text-purple-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">AI Safety Dashboard</h1>
                                <p className="text-purple-400 text-sm">Report Your Inceidents Here </p>
                            </div>
                        </div>

                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm border-t-4 border-red-500">
                        <div className="flex items-center gap-2">
                            <AlertOctagon className="h-5 w-5 text-red-500" />
                            <h3 className="text-gray-500 text-sm font-medium">High </h3>
                        </div>
                        <p className="text-2xl font-bold text-gray-700 mt-1">
                            {incidents.filter(i => i.severity === 'High').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border-t-4 border-yellow-300">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-yellow-300" />
                            <h3 className="text-gray-500 text-sm font-medium">Medium </h3>
                        </div>
                        <p className="text-2xl font-bold text-gray-700 mt-1">
                            {incidents.filter(i => i.severity === 'Medium').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border-t-4 border-lime-300">
                        <div className="flex items-center gap-2">
                            <AlertCircleIcon className="h-5 w-5 text-lime-300" />
                            <h3 className="text-gray-500 text-sm font-medium">Low </h3>
                        </div>
                        <p className="text-2xl font-bold text-gray-700 mt-1">
                            {incidents.filter(i => i.severity === 'Low').length}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
                            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b border-gray-200 pb-2 flex items-center gap-2">
                                <Filter className="h-5 w-5 text-purple-400" />
                                Incident Controls
                            </h2>

                            <FilterControls selectedSeverity={filter} onSeverityChange={setFilter} />
                            <Sort selectedSort={sortOrder} onSortChange={setSortOrder} />

                            <button
                                onClick={() => setShowForm(!showForm)}
                                className={`w-full mt-4 px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${showForm ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' : 'bg-purple-400 text-white hover:bg-purple-500'}`}
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
                                <h3 className="text-gray-500 text-sm font-medium mb-2 flex items-center gap-2">
                                    <List className="h-4 w-4" />
                                    Recent Activity
                                </h3>
                                <div className="space-y-3">
                                    {incidents.slice(0, 3).map(incident => (
                                        <div key={incident.id} className="text-sm text-gray-600 flex items-start gap-2">
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

                    {/* Right Column - Content */}
                    <div className="lg:w-3/4">
                        {/* Incident Form */}
                        {showForm && (
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
                                <IncidentForm
                                    onSubmit={handleAddIncident}
                                    onCancel={() => setShowForm(false)}
                                />
                            </div>
                        )}

                        {/* Incidents List */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-purple-400" />
                                    Incident Reports
                                </h2>
                                <span className="bg-purple-100 text-purple-500 text-xs font-medium rounded-full px-3 py-1">
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

                {/* Footer */}
                <footer className="mt-8 text-center text-gray-400 text-sm">
                    <p>
                        AI Safety Dashboard • Created by Saraswati Chandra
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-2">

                        <a href="https://www.linkedin.com/in/saraswati-chandra069" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline  ">
                            <Linkedin className="h-4 w-4" />
                        </a>
                        <a href="https://github.com/saras-69" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline  ">
                            <Github className="h-4 w-4" />
                        </a>
                        <a href="mailto:saketsingh102003@gmail.com " className="text-blue-500 hover:underline  ">
                            <Mail className="h-4 w-4" />
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Dashboard;