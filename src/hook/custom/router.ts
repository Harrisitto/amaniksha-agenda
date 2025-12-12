import { useRouter } from 'expo-router';

export const useNavigateToForm = () => {
    const router = useRouter();
    return (id: number) => {
        router.push(`/form?id=${id}`);
    };
}

export const useNavigateToHome = () => {
    const router = useRouter();
    return () => {
        router.push(`/`);
    };
}

export const useNavigateToView = () => {
    const router = useRouter();
    return (id: number) => {
        router.push(`/view?id=${id}`);
    }
}
