'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleChange = (term: string) => {
    console.log('searching....' + term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

// **The first Thing to do is to capture the user's input and we accomplish that by :
// adding onChange on the Input then invoking a Function to capture the e.target.value.
// **Since now we can capture the user's Input, we need to update the URL with this searched/Typed Term:
//  1 -  Next we need the useSearchParams hook to manipulate the URL query Parameters and this is done
//    a- importing the hook
//    b- Declaring a variable
//    c- Storing it by using the URLSeachParams()
//    d- set the params query to term or delete query in case nothing was entered

//  2 - Next we use the useRouter and usePathname to update the URL
//  3 - If a user updates the query in the url then our search string does not update. In order to keep them in sync
//      then we have to add a defaultValue to our input which is equal to the searchParams.
//  4 - Now we have to filter our units based on the term entered.
//    a- The component has access to the searchParams and its parameters (unit.tsx)
//    b- We need to pass this query to our data fetching (unit.tsx)
//    c- starting by declaring a variable equale to the URL query and set it to empty string in case there are no query params
//    d- The apply the query to the filter.
