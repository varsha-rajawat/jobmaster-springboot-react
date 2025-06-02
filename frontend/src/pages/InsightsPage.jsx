import { useEffect, useState, useContext } from 'react';
import {
    PieChart, Pie, Cell, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer,
} from 'recharts';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c', '#d0ed57'];

const InsightsPage = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const response = await api.get(`/insights/all?userId=${user.id}`);
                setData(response.data);
            } catch (err) {
                console.error('Failed to load insights:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchInsights();
    }, [user.id]);


    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Loader2 className="animate-spin w-8 h-8" />
            </div>
        );
    }

    if (!data) {
        return <div className='text-center mt-10 text-red-600'>
            Failed to load insights.
        </div>
    }

    return (
        <div className='p-6 space-y-8'>
            <h1 className='text-3xl font-bold'>Job Application Insights</h1>

            {/* Pie Chart - Status Distribution */}
            <Card>
                <CardContent className='p-6'>
                    <h2 className='text-xl font-semibold mb-4'>Applications by Status</h2>
                    <ResponsiveContainer width='100%' height={300}>
                        <PieChart>
                            <Pie
                                data={data.statusCounts}
                                dataKey="count"
                                nameKey="status"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {data.statusCounts.map((entry, index) => (
                                    <Cell key={`cell=${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <RechartsTooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Bar Chart - Weekly Count */}
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Applications in Last 7 Days</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data.weeklyCounts}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <RechartsTooltip />
                            <Bar dataKey="count" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Line Chart - Monthly Count */}
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Monthly Applications</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data.monthlyCounts}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <RechartsTooltip />
                            <Line type="monotone" dataKey="count" stroke="#ff7f50" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>set
            </Card>

            {/* Offer to Application Ratio */}
            <Card>
                <CardContent className="p-6 text-center">
                    <h2 className="text-xl font-semibold mb-2">Offer to Application Ratio</h2>
                    <p className="text-4xl font-bold text-green-600">
                        {data.offerToApplicationRatio.toFixed(2)}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default InsightsPage;