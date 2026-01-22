import type { ReactNode, AnchorHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    href?: string;
} & (AnchorHTMLAttributes<HTMLAnchorElement> | React.ButtonHTMLAttributes<HTMLButtonElement>);

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
};

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    href,
    ...props
}: ButtonProps) {
    const classes = `btn ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
        return (
            <a href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
                {children}
            </a>
        );
    }

    return (
        <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
            {children}
        </button>
    );
}
