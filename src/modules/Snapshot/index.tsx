import { useEffect, useState, useCallback } from "react";
import { ApiService } from "../../core/api/services";
import { Card, Row, Col, Typography, Statistic, Space, Tabs } from 'antd';
import VirtualList from 'rc-virtual-list';
import { 
    BarChartOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Snapshot = () => {
    const [snapshot, setSnapshot] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSnapshot();
    }, []);

    const fetchSnapshot = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await ApiService.get('/timeseries');
            if (response?.status === 200) {
                setSnapshot(response?.data);
            }
        } catch (error) {
            console.error('Error fetching snapshot data:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getLatestSnapshot = useCallback(() => {
        if (!snapshot?.ts || snapshot.ts.length === 0) return null;
        return snapshot.ts[snapshot.ts.length - 1];
    }, [snapshot?.ts]);

    const getFirstSnapshot = useCallback(() => {
        if (!snapshot?.ts || snapshot.ts.length === 0) return null;
        return snapshot.ts[0];
    }, [snapshot?.ts]);

    const getTotalReturn = useCallback(() => {
        const latest = getLatestSnapshot();
        const first = getFirstSnapshot();
        if (!latest || !first || first.value === 0) return 0;
        return ((latest.value - first.value) / first.value) * 100;
    }, [getLatestSnapshot, getFirstSnapshot]);

    const getPerformanceMetrics = useCallback(() => {
        const latest = getLatestSnapshot();
        if (!latest) return null;

        return {
            currentValue: latest.value || 0,
            performanceValue: latest.performanceValue || 0,
            exposure: latest.exposure || 0,
            timeWeightedReturn: latest.timeWeightedReturn || 0,
            moneyWeightedReturn: latest.moneyWeightedReturn || 0,
            return: latest.return || 0,
            benchmarkReturn: latest.adjustedBenchmarkReturn || 0,
            benchmarkValue: latest.adjustedBenchmarkValue || 0
        };
    }, [getLatestSnapshot]);

    const getTimeSeriesData = useCallback(() => {
        if (!snapshot?.ts) return [];
        return snapshot.ts.map((item: any, index: number) => ({
            date: item.date,
            value: item.value,
            return: item.return,
            benchmarkValue: item.adjustedBenchmarkValue,
            benchmarkReturn: item.adjustedBenchmarkReturn,
            index
        }));
    }, [snapshot?.ts]);

    const latestSnapshot = getLatestSnapshot();
    const performanceMetrics = getPerformanceMetrics();
    const totalReturn = getTotalReturn();
    const timeSeriesData = getTimeSeriesData();

    // Virtual list configuration
    const containerHeight = 400;
    const itemHeight = 50;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <Text>Loading holdings snapshot...</Text>
                </div>
            </div>
        );
    }

    if (!snapshot || !latestSnapshot) {
        return (
            <div className="text-center py-8">
                <Text type="secondary">No snapshot data available</Text>
            </div>
        );
    }

    const tabItems = [
        {
            key: 'overview',
            label: 'Portfolio Overview',
            children: (
                <div className="space-y-6">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={6}>
                            <Card>
                                <Statistic
                                    title="Current Value"
                                    value={performanceMetrics?.currentValue || 0}
                                    prefix="$"
                                    valueStyle={{ color: '#3f8600', fontSize: '20px' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Card>
                                <Statistic
                                    title="Total Return"
                                    value={totalReturn}
                                    suffix="%"
                                    prefix={totalReturn >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                    valueStyle={{ 
                                        color: totalReturn >= 0 ? '#3f8600' : '#cf1322',
                                        fontSize: '20px'
                                    }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Card>
                                <Statistic
                                    title="Daily Return"
                                    value={performanceMetrics?.return ? (performanceMetrics.return * 100).toFixed(2) : 0}
                                    suffix="%"
                                    valueStyle={{ 
                                        color: (performanceMetrics?.return || 0) >= 0 ? '#3f8600' : '#cf1322',
                                        fontSize: '18px'
                                    }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Card>
                                <Statistic
                                    title="Exposure"
                                    value={performanceMetrics?.exposure || 0}
                                    prefix="$"
                                    valueStyle={{ color: '#1890ff', fontSize: '18px' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={12}>
                            <Card title="Portfolio Performance" size="small">
                                <Space direction="vertical" size="middle" className="w-full">
                                    <div className="flex justify-between">
                                        <Text>Current Value:</Text>
                                        <Text strong>${(performanceMetrics?.currentValue || 0).toLocaleString()}</Text>
                                    </div>
                                    <div className="flex justify-between">
                                        <Text>Total Return:</Text>
                                        <Text strong style={{ color: totalReturn >= 0 ? '#3f8600' : '#cf1322' }}>
                                            {totalReturn.toFixed(2)}%
                                        </Text>
                                    </div>
                                    <div className="flex justify-between">
                                        <Text>Time Weighted Return:</Text>
                                        <Text strong>
                                            {((performanceMetrics?.timeWeightedReturn || 0) * 100).toFixed(4)}%
                                        </Text>
                                    </div>
                                    <div className="flex justify-between">
                                        <Text>Money Weighted Return:</Text>
                                        <Text strong>
                                            {((performanceMetrics?.moneyWeightedReturn || 0) * 100).toFixed(4)}%
                                        </Text>
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card title="Benchmark Comparison" size="small">
                                <Space direction="vertical" size="middle" className="w-full">
                                    <div className="flex justify-between">
                                        <Text>Benchmark Value:</Text>
                                        <Text strong>${(performanceMetrics?.benchmarkValue || 0).toLocaleString()}</Text>
                                    </div>
                                    <div className="flex justify-between">
                                        <Text>Benchmark Return:</Text>
                                        <Text strong>
                                            {((performanceMetrics?.benchmarkReturn || 0) * 100).toFixed(2)}%
                                        </Text>
                                    </div>
                                    <div className="flex justify-between">
                                        <Text>Outperformance:</Text>
                                        <Text strong style={{ 
                                            color: (performanceMetrics?.return || 0) > (performanceMetrics?.benchmarkReturn || 0) ? '#3f8600' : '#cf1322' 
                                        }}>
                                            {(((performanceMetrics?.return || 0) - (performanceMetrics?.benchmarkReturn || 0)) * 100).toFixed(2)}%
                                        </Text>
                                    </div>
                                    <div className="flex justify-between">
                                        <Text>Currency:</Text>
                                        <Text strong>{snapshot.currency}</Text>
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
        },
        {
            key: 'timeline',
            label: 'Performance Timeline',
            children: (
                <div className="space-y-6">
                    {/* Data Summary */}
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={8}>
                            <Card size="small">
                                <Statistic
                                    title="Total Data Points"
                                    value={timeSeriesData.length}
                                    valueStyle={{ color: '#1890ff' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card size="small">
                                <Statistic
                                    title="Date Range"
                                    value={`${timeSeriesData[0]?.date || 'N/A'} to ${timeSeriesData[timeSeriesData.length - 1]?.date || 'N/A'}`}
                                    valueStyle={{ color: '#52c41a', fontSize: '14px' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card size="small">
                                <Statistic
                                    title="Memory Optimized"
                                    value="Virtual Scrolling"
                                    valueStyle={{ color: '#fa8c16', fontSize: '14px' }}
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Card title="All Performance Data (Virtualized)" extra={<BarChartOutlined />}>
                        <div className="border border-gray-200 rounded">
                            <div className="grid grid-cols-5 gap-4 p-3 bg-gray-50 border-b border-gray-200 font-semibold text-sm">
                                <div>Date</div>
                                <div className="text-right">Portfolio Value</div>
                                <div className="text-right">Daily Return</div>
                                <div className="text-right">Benchmark Value</div>
                                <div className="text-right">Benchmark Return</div>
                            </div>
                            <VirtualList
                                data={timeSeriesData}
                                height={containerHeight}
                                itemHeight={itemHeight}
                                itemKey="date"
                            >
                                {(item: any) => (
                                    <div 
                                        key={item.date}
                                        className="grid grid-cols-5 gap-4 p-3 border-b border-gray-100 hover:bg-gray-50 text-sm"
                                    >
                                        <div className="font-medium">{item.date}</div>
                                        <div className="text-right">
                                            ${item.value.toLocaleString()}
                                        </div>
                                        <div className="text-right">
                                            <Text style={{ color: item.return >= 0 ? '#3f8600' : '#cf1322' }}>
                                                {(item.return * 100).toFixed(2)}%
                                            </Text>
                                        </div>
                                        <div className="text-right">
                                            ${item.benchmarkValue.toLocaleString()}
                                        </div>
                                        <div className="text-right">
                                            <Text style={{ color: item.benchmarkReturn >= 0 ? '#3f8600' : '#cf1322' }}>
                                                {(item.benchmarkReturn * 100).toFixed(2)}%
                                            </Text>
                                        </div>
                                    </div>
                                )}
                            </VirtualList>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 text-center">
                            Showing {timeSeriesData.length.toLocaleString()} data points with virtual scrolling
                        </div>
                    </Card>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Title level={2} className="m-0">Holdings Snapshot</Title>
                    <Text type="secondary">
                        Portfolio performance from {snapshot.from} to {snapshot.to}
                    </Text>
                </div>
                <div className="text-right">
                    <Statistic
                        title="Total Return"
                        value={totalReturn}
                        suffix="%"
                        prefix={totalReturn >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        valueStyle={{ 
                            color: totalReturn >= 0 ? '#3f8600' : '#cf1322',
                            fontSize: '24px'
                        }}
                    />
                </div>
            </div>

            <Tabs
                defaultActiveKey="overview"
                items={tabItems}
                size="large"
                className="bg-white rounded-lg shadow-sm"
            />
        </div>
    );
};

export default Snapshot;