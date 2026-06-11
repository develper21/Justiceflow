import type { ReactNode, Key } from 'react';

interface TableColumn<T> {
  key?: string;
  accessor?: keyof T | string;
  header: string;
  render?: (value: any, item: T) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (item: T) => void;
}

export function Table<T extends { id: string }>({
  data,
  columns,
  onRowClick,
}: TableProps<T>) {
  // Safety check: ensure data is an array
  if (!Array.isArray(data)) {
    return null;
  }

  const getColumnKey = (column: TableColumn<T>, index: number): Key => {
    if (column.key) return column.key;
    if (typeof column.accessor === 'string') return column.accessor;
    return index;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={getColumnKey(column, index)}
                className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick?.(item)}
              className={onRowClick ? 'cursor-pointer hover:bg-blue-50/50' : ''}
            >
              {columns.map((column, index) => {
                const fieldKey = (column.key || column.accessor) as keyof T;
                const value = item[fieldKey];
                
                return (
                  <td
                    key={getColumnKey(column, index)}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {column.render
                      ? column.render(value, item)
                      : (value as ReactNode)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
