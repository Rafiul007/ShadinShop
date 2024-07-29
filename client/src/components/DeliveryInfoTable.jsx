function DeliveryInfoTable() {
  return (
    <div className="w-full overflow-x-auto">
      <p className="text-md font-bold">Delivery Info:</p>
      <table
        className="w-full text-left border border-collapse rounded sm:border-separate border-slate-200"
        cellSpacing="0"
      >
        <tbody>
          <tr>
            <th
              scope="col"
              className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Address
            </th>
            <th
              scope="col"
              className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Time
            </th>
            <th
              scope="col"
              className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Charge
            </th>
          </tr>
          <tr>
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
              Inside Dhaka
            </td>
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
              2-3 days
            </td>
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
              80 TK
            </td>
          </tr>
          <tr>
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
              Outside Dhaka
            </td>
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
              4-7 days
            </td>
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
              160 TK
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DeliveryInfoTable;
