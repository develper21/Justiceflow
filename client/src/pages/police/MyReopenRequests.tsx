import React, { useEffect, useState } from 'react';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/ui/Card';
import { caseReopenApi } from '../../api/caseReopen.api';
import { CaseReopenRequest } from '../../types/api.types';
import { Loader } from '../../components/common/Loader';

export const MyReopenRequests: React.FC = () => {
  const [requests, setRequests] = useState<CaseReopenRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await caseReopenApi.getMyRequests();
      setRequests(res);
    } catch (err) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <Header title="My Re-open Requests" subtitle="Requests submitted by you" />
      <Card>
        {requests.length === 0 && <div className="text-center py-8 text-gray-600">No requests</div>}
        {requests.map((r) => (
          <div key={r.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200 mb-3 last:mb-0">
            <div>
              <div className="font-bold text-navy-900">Case {r.caseId}</div>
              <div className="text-sm text-navy-700 mt-1">Status: {r.status}</div>
              <div className="text-sm text-navy-700">Reason: {r.policeReason}</div>
            </div>
            <div className="text-sm text-navy-600 font-medium">{r.decidedAt ? new Date(r.decidedAt).toLocaleString() : new Date(r.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </Card>
    </div>
  );
};