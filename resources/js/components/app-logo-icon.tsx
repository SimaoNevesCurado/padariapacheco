import type { ImgHTMLAttributes } from 'react';
import logo from '../../images/IconOnly.png';
import { cn } from '@/lib/utils';

export default function AppLogoIcon(
    { className, ...props }: ImgHTMLAttributes<HTMLImageElement>,
) {
    return (
        <img
            src={logo}
            alt="Logo da Padaria"
            className={cn('h-full w-full object-contain', className)}
            {...props}
        />
    );
}
