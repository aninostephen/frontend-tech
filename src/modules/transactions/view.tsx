import { useFormHook } from './config/useHook';
import { Card, Row, Col, Typography, Tag, Button, Space } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const View = () => {
    const { transaction, isLoading } = useFormHook({mode: 'view'});
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!transaction) {
        return <div>Transaction not found</div>;
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'SETTLED': return 'green';
            case 'PENDING': return 'orange';
            case 'FAILED': return 'red';
            case 'PROCESSING': return 'blue';
            default: return 'default';
        }
    };

    const getTransactionTypeColor = (type: string) => {
        switch (type) {
            case 'BUY': return 'green';
            case 'SELL': return 'red';
            case 'TRANSFER': return 'blue';
            case 'DIVIDEND': return 'purple';
            default: return 'default';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button 
                        icon={<ArrowLeftOutlined />} 
                        onClick={() => navigate('/transactions')}
                        type="text"
                    >
                        Back to Transactions
                    </Button>
                    <Title level={2} className="m-0">Transaction Details</Title>
                </div>
                <Button 
                    type="primary" 
                    icon={<EditOutlined />}
                    onClick={() => navigate(`/transactions/edit/${transaction.id}`)}
                >
                    Edit Transaction
                </Button>
            </div>

            <Card>
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} md={8}>
                        <div className="text-center">
                            <Text type="secondary" className="block text-sm">Transaction ID</Text>
                            <Text strong className="text-lg">{transaction.id}</Text>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <div className="text-center">
                            <Text type="secondary" className="block text-sm">Status</Text>
                            <Tag color={getStatusColor(transaction.status)} className="text-sm">
                                {transaction.status}
                            </Tag>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <div className="text-center">
                            <Text type="secondary" className="block text-sm">Type</Text>
                            <Tag color={getTransactionTypeColor(transaction.transaction_type)} className="text-sm">
                                {transaction.transaction_type}
                            </Tag>
                        </div>
                    </Col>
                </Row>
            </Card>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                    <Card title="Portfolio Information" size="small">
                        <Space direction="vertical" size="middle" className="w-full">
                            <div className="flex justify-between">
                                <Text type="secondary">Portfolio ID:</Text>
                                <Text strong>{transaction.portfolio_id}</Text>
                            </div>
                            <div className="flex justify-between">
                                <Text type="secondary">Portfolio Name:</Text>
                                <Text strong>{transaction.portfolio || 'N/A'}</Text>
                            </div>
                            <div className="flex justify-between">
                                <Text type="secondary">Instrument ID:</Text>
                                <Text strong>{transaction.instrument_id}</Text>
                            </div>
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title="Transaction Details" size="small">
                        <Space direction="vertical" size="middle" className="w-full">
                            <div className="flex justify-between">
                                <Text type="secondary">Quantity:</Text>
                                <Text strong>{transaction.quantity?.toLocaleString()}</Text>
                            </div>
                            <div className="flex justify-between">
                                <Text type="secondary">Price:</Text>
                                <Text strong>${transaction.price?.toLocaleString()}</Text>
                            </div>
                            <div className="flex justify-between">
                                <Text type="secondary">Transaction Costs:</Text>
                                <Text strong>${transaction.transaction_costs?.toLocaleString()}</Text>
                            </div>
                            <div className="flex justify-between">
                                <Text type="secondary">FX Rate:</Text>
                                <Text strong>{transaction.fx_rate}</Text>
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                    <Card title="Important Dates" size="small">
                        <Space direction="vertical" size="middle" className="w-full">
                            <div className="flex justify-between">
                                <Text type="secondary">Trade Date:</Text>
                                <Text strong>{transaction.trade_date}</Text>
                            </div>
                            <div className="flex justify-between">
                                <Text type="secondary">Settlement Date:</Text>
                                <Text strong>{transaction.settlement_date}</Text>
                            </div>
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title="Additional Information" size="small">
                        <Space direction="vertical" size="middle" className="w-full">
                            {transaction.sale_method && (
                                <div className="flex justify-between">
                                    <Text type="secondary">Sale Method:</Text>
                                    <Text strong>{transaction.sale_method}</Text>
                                </div>
                            )}
                            {transaction.total_amount && (
                                <div className="flex justify-between">
                                    <Text type="secondary">Total Amount:</Text>
                                    <Text strong>${transaction.total_amount?.toLocaleString()}</Text>
                                </div>
                            )}
                            {transaction.price_uses_market_data !== undefined && (
                                <div className="flex justify-between">
                                    <Text type="secondary">Uses Market Data:</Text>
                                    <Text strong>{transaction.price_uses_market_data ? 'Yes' : 'No'}</Text>
                                </div>
                            )}
                        </Space>
                    </Card>
                </Col>
            </Row>

            {transaction.comments && (
                <Card title="Comments" size="small">
                    <Text>{transaction.comments}</Text>
                </Card>
            )}
        </div>
    );
};

export default View;