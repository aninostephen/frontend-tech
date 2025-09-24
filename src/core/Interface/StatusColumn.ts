interface StatusColumnProps {
  key?: string;
  dataIndex?: string;
  title?: string;
  width?: number | string;
  statusMapping?: Record<string, { color: string; label?: string }>;
}

export type { StatusColumnProps };