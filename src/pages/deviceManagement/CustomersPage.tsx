import Searchbar from '../../components/Searchbar';

const CustomersPage = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          {/* TODO: Dynamic Breadcrumbs */}
          <div className="text-sm text-slate-600">Device Management /</div>
          <h1 className="text-3xl font-semibold text-slate-900">Customers</h1>
        </div>

        <Searchbar />
      </div>
    </div>
  );
};

export default CustomersPage;
