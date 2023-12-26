import CreateCustomer from '@/app/ui/dashboard/customers/CreateCustomer';
import ListCustomers from '@/app/ui/dashboard/customers/ListCustomers';

export default function CustomersPage() {
  return (
    <div className=" w-full">
      <div className="w-1/2 border-2 border-amber-500 ">
        <h1 className=" text-center">Customers</h1>
        <nav>
          <ul>
            <li>Create</li>
          </ul>
        </nav>
      </div>
      {/* <div className="flex w-full  justify-around"> */}
      <div className=" w-full space-y-5">
        <ListCustomers />
        <CreateCustomer />
      </div>
    </div>
  );
}
