import React from 'react';

interface ProgressBarProps {
    label: string;
    value: number;
    max: number;
    color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
    showPercentage?: boolean;
}

const colorClasses = {
    blue: 'bg-gradient-to-r from-blue-600 to-blue-700',
    green: 'bg-gradient-to-r from-green-600 to-green-700',
    yellow: 'bg-gradient-to-r from-yellow-600 to-yellow-700',
    red: 'bg-gradient-to-r from-red-600 to-red-700',
    purple: 'bg-gradient-to-r from-purple-600 to-purple-700',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
    label,
    value,
    max,
    color = 'blue',
    showPercentage = true,
}) => {
    const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-navy-900">{label}</span>
                {showPercentage && (
                    <span className="text-sm text-navy-700">
                        {value} / {max} ({percentage.toFixed(0)}%)
                    </span>
                )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div
                    className={`h-full ${colorClasses[color]} transition-all duration-500 ease-out rounded-full`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};
