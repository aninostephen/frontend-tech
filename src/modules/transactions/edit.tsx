import MainForm from '../../components/common/Form';
import fields from './config/fields';
import { useFormHook } from "./config/useHook";
import { Spin } from 'antd';

const Edit = () => {
    const { isLoading, instruments, transaction, isFetchTransaction, handleSubmit, handleCancel } = useFormHook({mode: 'edit'});
    const fieldsConfig = fields({ instruments });

    if (isFetchTransaction) return <Spin />;
    return (
        <MainForm
            title="Edit Transaction"
            description="Update transaction information"
            fields={fieldsConfig}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            mode="edit"
            isLoading={isLoading}
            defaultValues={transaction}
        />
    );
};

export default Edit;