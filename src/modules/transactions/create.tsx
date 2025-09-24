import MainForm from '../../components/common/Form';
import fields from './config/fields';
import { useFormHook } from './config/useHook';

const Create = () => {
    const { handleSubmit, handleCancel, instruments, isLoading } = useFormHook({mode: 'create'});

    const fieldsConfig = fields({ instruments });

    return (
        <MainForm
            title="Create Transaction"
            description="Add a new transaction to the system"
            fields={fieldsConfig}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            mode="create"
            isLoading={isLoading}
        />
    );
};

export default Create;
