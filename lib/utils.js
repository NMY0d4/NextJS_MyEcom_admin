import { useRouter } from 'next/router';

export function useRouterUtil() {
  const router = useRouter();

  function goTo(route) {
    router.push(`/${route}`);
  }

  return { goTo };
}

export function getRandomNumber() {
  return Math.floor(Math.random() * 1000000) + 1;
}
