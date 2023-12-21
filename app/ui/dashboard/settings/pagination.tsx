'use client';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

export default function Pagination({
  itemCount,
  pageSize,
  currentPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const createPageURL = (page: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };

  return (
    <div className="flex gap-4">
      <button onClick={() => createPageURL(1)}>
        <ArrowLeftIcon width={20} height={20} />
      </button>
      <button onClick={() => createPageURL(currentPage - 1)}>
        <ArrowLeftIcon width={20} height={20} />
      </button>
      <span>
        Page {currentPage} of {pageCount}
      </span>
      <button onClick={() => createPageURL(currentPage + 1)}>
        <ArrowRightIcon width={20} height={20} />
      </button>
      <button onClick={() => createPageURL(pageCount)}>
        <ArrowRightIcon width={20} height={20} />
      </button>
    </div>
  );
}
