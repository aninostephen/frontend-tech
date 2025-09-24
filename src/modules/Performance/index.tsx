import { useEffect, useState } from "react";
import { ApiService } from "../../core/api/services";
import { Card, Row, Col, Typography, Statistic, Progress, Space, Tag } from 'antd';
import { 
    PieChartOutlined, 
    WalletOutlined,
    GlobalOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Performance = () => {
    const [performance, setPerformance] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPerformance();
    }, []);

    const fetchPerformance = async () => {
        setIsLoading(true);
        try {
            const response = await ApiService.get('/assetalloc');
            if (response?.status === 200) {
                setPerformance(response?.data);
            }
        } catch (error) {
            console.error('Error fetching performance data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Calculate total portfolio value
    const getTotalValue = () => {
        if (!performance || performance.length === 0) return 0;
        return performance.reduce((total: number, asset: any) => total + (asset.absolute_value || 0), 0);
    };

    // Calculate asset allocation percentages
    const getAssetAllocation = () => {
        if (!performance || performance.length === 0) return [];
        const total = getTotalValue();
        return performance.map((asset: any) => ({
            name: asset.name,
            value: asset.absolute_value,
            percentage: ((asset.absolute_value / total) * 100).toFixed(2),
            currency: asset.currency,
            quantity: asset.quantity
        }));
    };

    // Get currency breakdown
    const getCurrencyBreakdown = () => {
        if (!performance || performance.length === 0) return [];
        const currencies: any = {};
        
        performance.forEach((asset: any) => {
            if (asset.currency) {
                if (!currencies[asset.currency]) {
                    currencies[asset.currency] = 0;
                }
                currencies[asset.currency] += asset.absolute_value || 0;
            }
        });
        
        return Object.entries(currencies).map(([currency, value]) => ({
            currency,
            value: value as number,
            percentage: (((value as number) / getTotalValue()) * 100).toFixed(2)
        }));
    };


    const totalValue = getTotalValue();
    const assetAllocation = getAssetAllocation();
    const currencyBreakdown = getCurrencyBreakdown();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <Text>Loading performance data...</Text>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Title level={2} className="m-0">Performance Overview</Title>
                    <Text type="secondary">Portfolio performance and asset allocation analysis</Text>
                </div>
                <div className="text-right">
                    <Statistic
                        title="Total Portfolio Value"
                        value={totalValue}
                        prefix="$"
                        valueStyle={{ color: '#3f8600', fontSize: '24px' }}
                    />
                </div>
            </div>

            {/* Key Metrics */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Total Assets"
                            value={performance.length}
                            prefix={<WalletOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Currencies"
                            value={currencyBreakdown.length}
                            prefix={<GlobalOutlined />}
                            valueStyle={{ color: '#722ed1' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Asset Classes"
                            value={assetAllocation.length}
                            prefix={<PieChartOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                {/* <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Diversification"
                            value={85}
                            suffix="%"
                            valueStyle={{ color: '#fa8c16' }}
                        />
                    </Card>
                </Col> */}
            </Row>

            {/* Asset Allocation */}
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                    <Card title="Asset Allocation" extra={<PieChartOutlined />}>
                        <Space direction="vertical" size="middle" className="w-full">
                            {assetAllocation.map((asset: any, index: number) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <Text strong>{asset.name}</Text>
                                            <Tag color="blue">{asset.currency}</Tag>
                                        </div>
                                        <div className="text-right">
                                            <Text strong>${asset.value.toLocaleString()}</Text>
                                            <br />
                                            <Text type="secondary">{asset.percentage}%</Text>
                                        </div>
                                    </div>
                                    <Progress 
                                        percent={parseFloat(asset.percentage)} 
                                        size="small" 
                                        strokeColor="#1890ff"
                                        showInfo={false}
                                    />
                                </div>
                            ))}
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title="Currency Breakdown" extra={<GlobalOutlined />}>
                        <Space direction="vertical" size="middle" className="w-full">
                            {currencyBreakdown.map((currency, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <Text strong>{currency.currency}</Text>
                                        </div>
                                        <div className="text-right">
                                            <Text strong>${currency.value.toLocaleString()}</Text>
                                            <br />
                                            <Text type="secondary">{currency.percentage}%</Text>
                                        </div>
                                    </div>
                                    <Progress 
                                        percent={parseFloat(currency.percentage)} 
                                        size="small" 
                                        strokeColor="#52c41a"
                                        showInfo={false}
                                    />
                                </div>
                            ))}
                        </Space>
                    </Card>
                </Col>
            </Row>

        </div>
    );
};

export default Performance;