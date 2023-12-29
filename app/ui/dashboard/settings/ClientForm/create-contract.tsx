import Link from 'next/link';
import { LiaFileContractSolid } from 'react-icons/lia';

export default function CreateUnitContract({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/contract/unit/${id}`}>
      {<LiaFileContractSolid className="text-2xl" />}
    </Link>
  );
}
