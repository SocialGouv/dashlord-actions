import { GridColDef } from "@mui/x-data-grid";

// use to mock mui-datagrid in tests
export const FakeDataGrid = ({
  rows,
  columns,
}: {
  rows: Record<string, any>;
  columns: GridColDef[];
}) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.field}>
              {col.headerName}
              <br />
              {col.description}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows
          .filter((row) => row.url)
          .map((row) => {
            return (
              <tr key={row.url}>
                {columns.map((col) => {
                  return (
                    <td key={col.field}>
                      {col.renderCell(
                        // @ts-ignore
                        col.valueGetter
                          ? // @ts-ignore
                            { value: col.valueGetter({ row }), row }
                          : { value: row[col.field], row }
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default FakeDataGrid;
