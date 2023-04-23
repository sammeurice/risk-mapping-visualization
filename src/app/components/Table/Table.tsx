import React from "react";
import { ParsedAsset, Asset } from "@/app/services/models";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";

export default function Table({ assets }: { assets: ParsedAsset[] }) {
  // Need to filter by category, risk factors, and min and max total risk rating
  const columns = [
    {
      name: "Asset Name",
      selector: (row: ParsedAsset) => row["Asset Name"],
      sortable: true,
      width: "200px",
    },
    {
      name: "Business Category",
      selector: (row: ParsedAsset) => row["Business Category"],
      sortable: true,
      width: "200px",
    },
    {
      name: "Risk Rating",
      selector: (row: ParsedAsset) => row["Risk Rating"],
      sortable: true,
      width: "150px",
    },
    {
      name: "Year",
      selector: (row: ParsedAsset) => row.Year,
      width: "150px",
    },
  ];

  const customStyles = {
    columns: { width: 300 },
  };

  const ExpandedComponent: React.FC<ExpanderComponentProps<ParsedAsset>> = ({
    data,
  }) => {
    const factorList = Object.entries(data["Risk Factors"]).map(
      ([name, value]) => (
        <p key={name}>
          {name}: {value}
        </p>
      )
    );
    return (
      <div className="p-4 gap-8 text-center justify-center">
        <h1 className="text-xl text-red-600">Risk Factors </h1>
        <div>{factorList}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <DataTable
        columns={columns}
        data={assets}
        pagination
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        theme="dark"
      />
    </div>
  );
}
