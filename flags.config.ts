// flags.config.ts
import { configure } from '@happykit/flags/config';
import { AppFlags } from './types/AppFlags';

configure<AppFlags>({
    envKey: process.env.NEXT_PUBLIC_FLAGS_ENVIRONMENT_KEY,
    defaultFlags: {
        it_man_shop: false,
    },
});
