import { useState } from 'react';
import LotSearchForm from './return/LotSearchForm';
import ReturnLotForm from './return/ReturnLotForm';
import RecentReturnsTable from './return/RecentReturnsTable';

const LaserReturnLot = () => {
  const [selectedLot, setSelectedLot] = useState<any>(null);

  const handleLotReturned = () => {
    setSelectedLot(null);
  };

  return (
    <div className="space-y-6">
      <LotSearchForm onLotFound={setSelectedLot} />
      {selectedLot && (
        <ReturnLotForm selectedLot={selectedLot} onLotReturned={handleLotReturned} />
      )}
      <RecentReturnsTable />
    </div>
  );
};

export default LaserReturnLot;
