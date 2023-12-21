import { deleteUnit } from '@/action/unit';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function DeleteUnit({ id }: { id: string }) {
  const deleteUnitWithId = deleteUnit.bind(null, id);

  return (
    <form action={deleteUnitWithId}>
      <button>
        {/* <span className="sr-only">Delete</span> */}
        <TrashIcon className="h-[18px] w-[18px] translate-y-1/2 cursor-pointer text-gray-500 peer-focus:text-gray-900" />
      </button>
    </form>
  );
}
