import { useEffect, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/ui/Card';
import { Loader } from '../../components/common/Loader';
import apiClient from '../../api/axios';

const COLORS = ['#3A5A97', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#8b5cf6'];

interface DashboardData {
    totalCases: number;
    activeCases: number;
    closedCases: number;
    statusDistribution: Array<{ name: string; value: number }>;
    monthlyTrends: Array<{ name: string; cases: number }>;
}

export const AnalyticsDashboard: React.FC = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await apiClient.get('/analytics/dashboard');
            setData(res.data.data);
        } catch (err) {
            console.error('Failed to load analytics', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;
    if (!data) return <div>Failed to load analytics</div>;

    return (
        <div className="space-y-6">
            <Header title="Crime Analytics Dashboard" subtitle="Real-time insights & trends" />

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="dashboard-stat-card">
                    <div className="text-center">
                        <p className="text-sm text-navy-700 font-semibold uppercase tracking-wide">TOTAL CASES</p>
                        <p className="dashboard-stat-number">{data.totalCases}</p>
                    </div>
                </Card>
                <Card className="dashboard-stat-card">
                    <div className="text-center">
                        <p className="text-sm text-navy-700 font-semibold uppercase tracking-wide">ACTIVE / PENDING</p>
                        <p className="dashboard-stat-number">{data.activeCases}</p>
                    </div>
                </Card>
                <Card className="dashboard-stat-card">
                    <div className="text-center">
                        <p className="text-sm text-navy-700 font-semibold uppercase tracking-wide">CLOSED / SOLVED</p>
                        <p className="dashboard-stat-number">{data.closedCases}</p>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Pie Chart: Case Distribution */}
                <Card title="Case Status Breakdown">
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.statusDistribution}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                >
                                    {data.statusDistribution.map((_entry: { name: string; value: number }, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Line Chart: Monthly Trends */}
                <Card title="Monthly Crime Trend (Last 6 Months)">
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.monthlyTrends}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="cases" stroke="#3A5A97" strokeWidth={3} dot={{ r: 6, fill: '#3A5A97' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Bar Chart: Case Load (Simulated for Demo) */}
                <Card title="Efficiency Metrics" className="lg:col-span-2">
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { name: 'Investigation', value: 45 },
                                { name: 'Documentation', value: 80 },
                                { name: 'Court Submission', value: 65 },
                                { name: 'Resolution', value: 30 },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#10b981" name="Avg Days to Complete" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-2">Average turnaround time (days) per stage</p>
                </Card>
            </div>
        </div>
    );
};
