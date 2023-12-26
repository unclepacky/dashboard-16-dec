import { deleteConversionRate } from '@/action/currency';
import { deleteUnit } from '@/action/unit';
import { TrashIcon } from '@heroicons/react/24/outline';

type DeleteFunction = (id: string) => Promise<void>;

export default function DeleteWithId({
  id,
  func1,
}: {
  id: string;
  func1: DeleteFunction;
}) {
  const deleteId = func1.bind(null, id);

  return (
    <form action={deleteId}>
      <button>
        {/* <span className="sr-only">Delete</span> */}
        <TrashIcon className="absolute right-1 top-1/3 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer text-gray-500 peer-focus:text-gray-900" />
      </button>
    </form>
  );
}
