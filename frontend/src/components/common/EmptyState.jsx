import React from 'react';
import { Package } from 'lucide-react';

const EmptyState = ({ title, subtitle, icon: Icon = Package }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <Icon className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
};

export default EmptyState;