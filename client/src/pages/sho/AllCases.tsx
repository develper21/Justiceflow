import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { TableSkeleton } from '../../components/common/SkeletonLoader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { EmptyState } from '../../components/common/EmptyState';
import { AdvancedSearch, SearchFilters } from '../../components/search';
import { caseApi } from '../../api';
import type { Case } from '../../types/api.types';
import { getCaseStateBadgeVariant, getCaseStateLabel } from '../../utils/caseState';

export const SHOAllCases: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchQuery: '',
    status: [],
    dateFrom: '',
    dateTo: '',
    sections: '',
    policeStation: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await caseApi.getAllCases();
      setCases(data);
    } catch (err: unknown) {
      type ErrorResponse = { response?: { data?: { message?: string } }; message?: string };
      const error = err as ErrorResponse;
      setError(error.response?.data?.message || error.message || 'Failed to load cases');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter cases based on search criteria
  const filteredCases = useMemo(() => {
    let filtered = [...cases];

    // Search query
    if (searchFilters.searchQuery) {
      const query = searchFilters.searchQuery.toLowerCase();
      filtered = filtered.filter((c) => {
        const firNumber = c.fir?.firNumber?.toLowerCase() || '';
        const sections = c.fir?.sectionsApplied?.toLowerCase() || '';
        const caseId = c.id.toLowerCase();
        const assignedTo = c.assignments?.find((a) => !a.unassignedAt)?.assignedUser?.name?.toLowerCase() || '';

        return (
          firNumber.includes(query) ||
          sections.includes(query) ||
          caseId.includes(query) ||
          assignedTo.includes(query)
        );
      });
    }

    // Status filter
    if (searchFilters.status.length > 0) {
      filtered = filtered.filter((c) =>
        searchFilters.status.includes(c.state?.currentState || '')
      );
    }

    // Date range filter
    if (searchFilters.dateFrom) {
      const fromDate = new Date(searchFilters.dateFrom);
      filtered = filtered.filter((c) => new Date(c.createdAt) >= fromDate);
    }

    if (searchFilters.dateTo) {
      const toDate = new Date(searchFilters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((c) => new Date(c.createdAt) <= toDate);
    }

    // IPC Sections filter
    if (searchFilters.sections) {
      const sectionQuery = searchFilters.sections.toLowerCase();
      filtered = filtered.filter((c) =>
        c.fir?.sectionsApplied?.toLowerCase().includes(sectionQuery)
      );
    }

    return filtered;
  }, [cases, searchFilters]);

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
  };

  const handleReset = () => {
    setSearchFilters({
      searchQuery: '',
      status: [],
      dateFrom: '',
      dateTo: '',
      sections: '',
      policeStation: '',
    });
  };

  if (isLoading) {
    return (
      <>
        <Header title="All Cases" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">All Cases</h1>
          <TableSkeleton rows={8} columns={6} />
        </div>
      </>
    );
  }
  
  if (error) return <ErrorMessage message={error} retry={fetchCases} />;

  // Calculate stats
  const unassignedCount = cases.filter(
    (c) => !c.assignments?.some((a) => !a.unassignedAt)
  ).length;

  return (
    <>
      <Header
        title="All Cases"
        subtitle={`${filteredCases.length} of ${cases.length} cases • ${unassignedCount} unassigned`}
      />

      {/* Advanced Search */}
      <AdvancedSearch onSearch={handleSearch} onReset={handleReset} />

      {/* Cases Table */}
      <Card>
        {filteredCases.length === 0 ? (
          <EmptyState
            message={
              cases.length === 0
                ? 'No cases in station yet'
                : 'No cases match your search criteria'
            }
            action={
              cases.length > 0 && (
                <Button variant="secondary" onClick={handleReset}>
                  Clear Filters
                </Button>
              )
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>
                    FIR Number
                  </th>
                  <th>
                    Sections
                  </th>
                  <th>
                    State
                  </th>
                  <th>
                    Assigned To
                  </th>
                  <th>
                    Progress
                  </th>
                  <th>
                    Created
                  </th>
                  <th>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((c) => {
                  const state = c.state?.currentState || 'UNKNOWN';
                  const activeAssignment = c.assignments?.find((a) => !a.unassignedAt);
                  const evidenceCount = c.evidence?.length || 0;
                  const witnessCount = c.witnesses?.length || 0;

                  return (
                    <tr
                      key={c.id}
                      onClick={() => navigate(`/sho/cases/${c.id}`)}
                    >
                      <td>
                        <span className="font-medium text-navy-700">
                          {c.fir?.firNumber || c.id.slice(0, 8)}
                        </span>
                      </td>
                      <td>
                        {c.fir?.sectionsApplied || '-'}
                      </td>
                      <td>
                        <Badge variant={getCaseStateBadgeVariant(state)}>
                          {getCaseStateLabel(state)}
                        </Badge>
                      </td>
                      <td>
                        {activeAssignment ? (
                          <span className="text-navy-900">{activeAssignment.assignedUser?.name}</span>
                        ) : (
                          <span className="text-red-600 font-medium">Unassigned</span>
                        )}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          {evidenceCount > 0 && (
                            <span className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 text-navy-900 px-2 py-0.5 rounded-full font-medium">
                              {evidenceCount} Evidence
                            </span>
                          )}
                          {witnessCount > 0 && (
                            <span className="text-xs bg-gradient-to-r from-green-50 to-emerald-50 text-navy-900 px-2 py-0.5 rounded-full font-medium">
                              {witnessCount} Witness
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        {new Date(c.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/sho/cases/${c.id}`);
                          }}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
};
