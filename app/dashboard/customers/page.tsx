import CreateCustomer from '@/app/ui/dashboard/customers/CreateCustomer';
import ListCustomers from '@/app/ui/dashboard/customers/ListCustomers';

export default function CustomersPage() {
  return (
    <div className=" w-full">
      {/* Sticky positioning for CreateCustomer */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="my-2 text-center text-2xl">CUSTOMERS</div>
        <CreateCustomer />
      </div>

      {/* Rest of the content */}
      <div className="my-10 w-full space-y-5">
        <ListCustomers />
      </div>
    </div>
  );
}
