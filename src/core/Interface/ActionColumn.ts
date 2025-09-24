interface ActionColumnProps {
  handleEdit?: (id: any) => void;
  handleDeleteClick?: (row: any) => void;
  hideView?: boolean;
  handleView?: (id: any) => void;
}

export type { ActionColumnProps };