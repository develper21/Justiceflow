import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DashboardSkeleton } from '../../components/common/DashboardSkeleton';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { CaseStatusPieChart, ProgressBar } from '../../components/charts';
import { caseApi } from '../../api';
import type { Case } from '../../types/api.types';
import { CaseState } from '../../types/api.types';
import { getCaseStateBadgeVariant, getCaseStateLabel } from '../../utils/caseState';
import { SectionExplainerCard } from '../../components/ai/SectionExplainerCard';

export const PoliceDashboard: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyCases();
  }, []);

  const fetchMyCases = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await caseApi.getMyCases();
      setCases(data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to load cases');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return (
    <>
      <Header
        title="Police Dashboard"
        subtitle="Manage FIRs and investigations"
        action={
          <Link to="/police/create-fir">
            <Button variant="primary">+ Create FIR</Button>
          </Link>
        }
      />
      <DashboardSkeleton />
    </>
  );
  if (error) return <ErrorMessage message={error} retry={fetchMyCases} />;

  // Calculate stats
  const totalCases = cases.length;
  const underInvestigation = cases.filter(
    (c) => c.state?.currentState === CaseState.UNDER_INVESTIGATION
  ).length;
  const submittedToCourt = cases.filter(
    (c) =>
      c.state?.currentState === CaseState.SUBMITTED_TO_COURT ||
      c.state?.currentState === CaseState.COURT_ACCEPTED
  ).length;
  const completed = cases.filter(
    (c) => c.state?.currentState === CaseState.INVESTIGATION_COMPLETED
  ).length;

  // Chart data for case status
  const caseStatusData = [
    { name: 'Under Investigation', value: underInvestigation, color: '#f59e0b' },
    { name: 'Completed', value: completed, color: '#10b981' },
    { name: 'In Court', value: submittedToCourt, color: '#3A5A97' },
    {
      name: 'Other',
      value: totalCases - underInvestigation - completed - submittedToCourt,
      color: '#6b7280',
    },
  ].filter((item) => item.value > 0);

  // Evidence collection progress
  const casesWithEvidence = cases.filter((c) => (c.evidence?.length || 0) > 0).length;
  const casesWithWitnesses = cases.filter((c) => (c.witnesses?.length || 0) > 0).length;
  const casesWithDocuments = cases.filter((c) => (c.documents?.length || 0) > 0).length;

  return (
    <>
      <Header
        title="Police Dashboard"
        subtitle="Manage FIRs and investigations"
        action={
          <Link to="/police/create-fir">
            <Button variant="primary">+ Create FIR</Button>
          </Link>
        }
      />

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-number">
            {totalCases}
          </div>
          <div className="dashboard-stat-label">Total Cases</div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-number">
            {underInvestigation}
          </div>
          <div className="dashboard-stat-label">Under Investigation</div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-number">
            {submittedToCourt}
          </div>
          <div className="dashboard-stat-label">In Court</div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-number">
            {completed}
          </div>
          <div className="dashboard-stat-label">Completed</div>
        </div>
      </div>

      {/* Analytics Section */}
      {totalCases > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Case Status Distribution */}
          <Card title="📊 Case Status Distribution">
            <CaseStatusPieChart data={caseStatusData} />
          </Card>

          {/* Investigation Progress */}
          <Card title="📈 Investigation Progress">
            <div className="py-4">
              <ProgressBar
                label="Cases with Evidence"
                value={casesWithEvidence}
                max={totalCases}
                color="blue"
              />
              <ProgressBar
                label="Cases with Witnesses"
                value={casesWithWitnesses}
                max={totalCases}
                color="green"
              />
              <ProgressBar
                label="Cases with Documents"
                value={casesWithDocuments}
                max={totalCases}
                color="purple"
              />
              <ProgressBar
                label="Investigation Completed"
                value={completed}
                max={totalCases}
                color="yellow"
              />
            </div>
          </Card>
        </div>
      )}

      {/* Section Explainer with precedents for quick reference */}
      <div className="mb-6">
        <SectionExplainerCard title="Section Explainer & Precedents" />
      </div>

      {/* Recent Cases */}
      <Card title="My Assigned Cases">
        {cases.length === 0 ? (
          <div className="text-center py-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 max-w-md mx-auto backdrop-blur-sm">
              <p className="text-navy-900 font-bold text-xl mb-3">No Cases Assigned Yet</p>
              <p className="text-navy-700 text-sm mb-4">
                Cases you create will appear here once the SHO assigns them to you for investigation.
              </p>
              <p className="text-gray-600 text-sm">
                💡 Tip: After creating an FIR, ask your SHO to assign the case to you.
              </p>
            </div>
            <div className="mt-6">
              <Link to="/police/create-fir">
                <Button variant="primary">+ Create New FIR</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {cases.slice(0, 5).map((c) => {
              const state = c.state?.currentState || 'UNKNOWN';
              const firNumber = c.fir?.firNumber || c.id.slice(0, 8);

              return (
                <Link key={c.id} to={`/police/cases/${c.id}`} className="case-list-item block">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="case-list-title">FIR: {firNumber}</h3>
                      <p className="text-sm text-gray-700 mt-1">
                        {c.fir?.sectionsApplied || 'No sections specified'}
                      </p>
                      <div className="case-list-meta">
                        <span className="case-list-meta-item">
                          📅 {new Date(c.createdAt).toLocaleDateString()}
                        </span>
                        {c.fir?.policeStation && (
                          <span className="case-list-meta-item">🏢 {c.fir.policeStation.name}</span>
                        )}
                        {c.evidence && c.evidence.length > 0 && (
                          <span className="case-list-meta-item">📎 {c.evidence.length} Evidence</span>
                        )}
                      </div>
                    </div>
                    <Badge variant={getCaseStateBadgeVariant(state)}>
                      {getCaseStateLabel(state)}
                    </Badge>
                  </div>
                </Link>
              );
            })}

            {cases.length > 5 && (
              <Link
                to="/police/my-cases"
                className="block text-center text-navy-700 hover:text-navy-900 font-medium mt-4 py-2 hover:underline transition-colors"
              >
                View All {cases.length} Cases →
              </Link>
            )}
          </div>
        )}
      </Card>
    </>
  );
};
