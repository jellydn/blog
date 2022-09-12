import type { Configuration } from '@happykit/flags/config';

export type AppFlags = {
    it_man_shop: boolean | null;
};

export const config: Configuration<AppFlags> = {
    envKey: process.env.NEXT_PUBLIC_FLAGS_ENVIRONMENT_KEY,
    defaultFlags: {
        it_man_shop: false,
    },
};
