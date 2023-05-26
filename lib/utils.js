import { useRouter } from 'next/router';

export function useRouterUtil() {
  const router = useRouter();

  function goTo(route) {
    router.push(`/${route}`);
  }

  return { goTo };
}

export function getRandomNumber(nbr) {
  return Math.floor(Math.random() * nbr) + 1;
}
