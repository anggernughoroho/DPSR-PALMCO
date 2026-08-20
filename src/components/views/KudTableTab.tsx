import React from 'react';
import { FilterPanel } from '../dashboard/FilterPanel';
import { KudDataTable } from '../table/KudDataTable';

export const KudTableTab: React.FC = () => {
  return (
    <div className="space-y-4 pb-12">
      <FilterPanel />
      <KudDataTable showTitle={true} />
    </div>
  );
};
