import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/api.types';
import { documentRequestsApi } from '../../api/documentRequests.api';
import { DocumentRequest } from '../../types/api.types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const ApprovedRequests: React.FC = () => {
  const [requests, setRequests] = useState<DocumentRequest[]>([]);
  const [loading, setLoading] = useState(false); // kept for future UX improvements (disable buttons)
  const { user } = useAuth();

  const load = async () => {
    setLoading(true);
    try {
      const res = await documentRequestsApi.getApprovedForCourt();
      setRequests(res);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const issue = async (id: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const remarks = prompt('Remarks (optional)') || undefined;
      setLoading(true);
      try {
        await documentRequestsApi.issue(id, file, remarks);
        await load();
      } finally { setLoading(false); }
    };
    input.click();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-navy-900 mb-2">Approved Document Requests</h2>
      <p className="text-sm text-navy-700 mb-6">Upload signed PDF and issue document</p>
      <Card>
        {requests.length === 0 && <div className="text-center py-8 text-navy-700">No approved requests</div>}
        {requests.map((r) => (
          <div key={r.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200 mb-3 last:mb-0">
            <div>
              <div className="font-bold text-navy-900">{r.documentType} — Case {r.caseId}</div>
              <div className="text-sm text-navy-700">{r.requestReason} — Requested by {r.requester?.name}</div>
            </div>
            <div className="space-x-2">
              <Button variant="ghost" onClick={() => {
                const base = (user?.role === UserRole.JUDGE) ? '/judge' : '/court';
                window.open(`${base}/cases/${r.caseId}`, '_blank');
              }}>View Case</Button>
              <Button onClick={() => issue(r.id)} disabled={loading}>Upload & Issue</Button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};