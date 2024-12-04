import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function isEmpty(value: any): boolean {
  return (
    typeof value === 'undefined' ||
    value === null ||
    (typeof value !== 'number' && value.length === 0)
  );
}

function deepMergeObjects(target: any, source: any) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object)
      Object.assign(source[key], deepMergeObjects(target[key], source[key]));
  }

  Object.assign(target || {}, source);

  for (const key of Object.keys(target)) {
    if (isEmpty(target[key])) {
      delete target[key];
    }
  }
  return target;
}

export default function useQueryParams() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [urlParams, setUrlParams] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return Object.fromEntries(searchParams.entries());
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setUrlParams(Object.fromEntries(searchParams.entries()));
  }, [location.search]);

  const setQueryParams = (data: any, noScroll = false) => {
    const params = deepMergeObjects(urlParams, data);
    const newSearch = new URLSearchParams(params).toString();
    navigate(`${location.pathname}?${newSearch}`, { state: { scroll: !noScroll } });
    setUrlParams(params);
  };

  function clearQueryParams() {
    navigate(`${pathname}`);
  }

  function removeQueryParams(key: string[]) {
    let url = new URL(window.location.href);
    key.forEach((item) => url.searchParams.delete(item));
    navigate(`${pathname}${url.search}`);
  }

  return {
    removeQueryParams,
    clearQueryParams,
    setQueryParams,
    queryParams: urlParams,
  };
}
