import React, { useState } from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';
import { Incident } from '../types';

interface IncidentFormProps {
    onSubmit: (incident: Omit<Incident, 'id' | 'reportedDate'>) => void;
    onCancel: () => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        severity: 'Medium' as 'Low' | 'Medium' | 'High'
    });

    const [errors, setErrors] = useState({
        title: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        const newErrors = {
            title: !formData.title ? 'Title is required' : '',
            description: !formData.description ? 'Description is required' : ''
        };

        setErrors(newErrors);

        // Check if there are any errors
        if (Object.values(newErrors).some(error => error)) {
            return;
        }

        onSubmit(formData);

        // Reset form
        setFormData({
            title: '',
            description: '',
            severity: 'Medium'
        });
    };

    return (
        <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-purple-50 p-4 border-b border-purple-100">
                <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-purple-300" />
                    Report New Incident
                </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-5">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-1">
                        Title<span className="text-purple-400">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full p-2.5 border ${errors.title ? 'border-purple-300' : 'border-slate-200'} rounded-md shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-purple-300 bg-white text-gray-700`}
                        placeholder="Enter incident title"
                    />
                    {errors.title && <p className="mt-1 text-sm text-purple-500">{errors.title}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">
                        Description<span className="text-purple-400">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full p-2.5 border ${errors.description ? 'border-purple-300' : 'border-slate-200'} rounded-md shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-purple-300 bg-white text-gray-700`}
                        placeholder="Provide detailed description of the incident"
                    />
                    {errors.description && <p className="mt-1 text-sm text-purple-500">{errors.description}</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Severity Level</label>
                    <div className="flex flex-wrap gap-6">
                        {(['Low', 'Medium', 'High'] as const).map(level => (
                            <label key={level} className="relative flex items-center">
                                <input
                                    type="radio"
                                    name="severity"
                                    value={level}
                                    checked={formData.severity === level}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <div className={`w-5 h-5 mr-2 border rounded-full flex items-center justify-center ${formData.severity === level
                                    ? level === 'High'
                                        ? 'bg-red-400 border-red-400'
                                        : level === 'Medium'
                                            ? 'bg-yellow-400 border-yellow-400'
                                            : 'bg-green-400 border-green-400'
                                    : 'bg-white border-slate-200'
                                    }`}
                                >
                                    {formData.severity === level && (
                                        <Check className="w-3 h-3 text-white" />
                                    )}
                                </div>
                                <span className={`font-medium ${level === 'High' ? 'text-red-700' :
                                    level === 'Medium' ? 'text-yellow-700' :
                                        'text-green-700'
                                    }`}>
                                    {level}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 order-2 sm:order-1"
                    >
                        <X className="h-4 w-4" />
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-purple-400 text-white rounded-md hover:bg-purple-500 transition-colors flex items-center justify-center gap-2 order-1 sm:order-2"
                    >
                        <Check className="h-4 w-4" />
                        Submit Report
                    </button>
                </div>
            </form>
        </div>
    );
};

export default IncidentForm;
