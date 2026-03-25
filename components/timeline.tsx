"use client";
import { ReactNode } from "react";

export function Timeline({ children }: { children: ReactNode }) {
    return (
        <ol className="relative border-s border-slate-200 dark:border-slate-700 pl-6 space-y-6">
            {children}
        </ol>
    );
}

export function TimelineItem({
                                 title,
                                 subtitle,
                                 period,
                                 children,
                             }: {
    title: string;
    subtitle?: string;
    period?: string;
    children?: ReactNode;
}) {
    return (
        <li className="space-y-2">
            <span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-blue-600 dark:bg-blue-400" />
            <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="font-semibold">{title}</h3>
                {subtitle && <span className="text-sm opacity-70">• {subtitle}</span>}
                {period && <span className="ms-auto text-xs opacity-70">{period}</span>}
            </div>
            {children && <div className="text-sm opacity-90">{children}</div>}
        </li>
    );
}
