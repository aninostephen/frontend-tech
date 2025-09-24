interface WrapperProps {
    children: React.ReactNode;
    title?: string;
    showSearch?: boolean;
    showAddButton?: boolean;
    addButtonText?: string;
    searchPlaceholder?: string;
    onSearch?: (value: string) => void;
    onAdd?: () => void;
    extra?: React.ReactNode;
    searchValue?: string;
    loading?: boolean;
}

export type { WrapperProps };
