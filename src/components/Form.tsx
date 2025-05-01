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
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = {
            title: !formData.title ? 'Title is required' : '',
            description: !formData.description ? 'Description is required' : ''
        };

        setErrors(newErrors);
        if (Object.values(newErrors).some(error => error)) {
            return;
        }

        onSubmit(formData);

        setFormData({
            title: '',
            description: '',
            severity: 'Medium'
        });
    };

    return (
        <div className="mb-6 bg-black/30 backdrop-blur-lg rounded-lg shadow-md overflow-hidden border border-white/40">
            <div className="bg-purple-500/30 backdrop-blur-md p-4 border-b border-purple-300/30">
                <h2 className="text-xl font-semibold text-white flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-purple-200" />
                    Report New Incident
                </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-5">
                    <label htmlFor="title" className="block text-sm font-medium text-white mb-1">
                        Title<span className="text-purple-300">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full p-2.5 border ${errors.title ? 'border-purple-300' : 'border-white/30'} rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white/30 backdrop-blur-sm text-white placeholder-white/60`}
                        placeholder="Enter incident title"
                    />
                    {errors.title && <p className="mt-1 text-sm text-purple-300">{errors.title}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
                        Description<span className="text-purple-300">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full p-2.5 border ${errors.description ? 'border-purple-300' : 'border-white/30'} rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white/30 backdrop-blur-sm text-white placeholder-white/60`}
                        placeholder="Provide detailed description of the incident"
                    />
                    {errors.description && <p className="mt-1 text-sm text-purple-300">{errors.description}</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-white mb-2">Severity Level</label>
                    <div className="flex flex-wrap gap-6">
                        {(['Low', 'Medium', 'High'] as const).map(level => (
                            <label key={level} className="relative flex items-center group">
                                <input
                                    type="radio"
                                    name="severity"
                                    value={level}
                                    checked={formData.severity === level}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <div className={`w-5 h-5 mr-2 border rounded-full flex items-center justify-center transition-colors ${formData.severity === level
                                    ? level === 'High'
                                        ? 'bg-red-500 border-red-500'
                                        : level === 'Medium'
                                            ? 'bg-yellow-500 border-yellow-500'
                                            : 'bg-green-500 border-green-500'
                                    : 'bg-white/30 backdrop-blur-sm border-white/50 group-hover:bg-white/40'
                                    }`}
                                >
                                    {formData.severity === level && (
                                        <Check className="w-3 h-3 text-white" />
                                    )}
                                </div>
                                <span className={`font-medium ${level === 'High' ? 'text-red-200' :
                                    level === 'Medium' ? 'text-yellow-200' :
                                        'text-green-200'
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
                        className="px-4 py-2 bg-black/20 backdrop-blur-sm text-white rounded-md hover:bg-white/30 transition-colors flex items-center justify-center gap-2 order-2 sm:order-1"
                    >
                        <X className="h-4 w-4" />
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-purple-500/70 backdrop-blur-sm text-white rounded-md hover:bg-purple-600/80 transition-colors flex items-center justify-center gap-2 order-1 sm:order-2"
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