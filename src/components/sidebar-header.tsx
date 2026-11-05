"use client";

import Link from "next/link";
import { Menu, TextAlignJustify } from "@/components/icons";
import { useBranding } from "./branding-provider";
import { useSidebar } from "./sidebar-state";
import type { SidebarHeaderProps } from "./sidebar-state-types";
import { Tooltip } from "./ui/tooltip";
import { useLanguage } from "./language-provider";

export function SidebarHeader({ href, label }: SidebarHeaderProps) {
	const { t } = useLanguage();
	const branding = useBranding();
	const displayAppName = (!branding.appName || branding.appName === "Mailflare") ? "MFlare" : branding.appName;
	const { minimal, toggle } = useSidebar();
	const toggleButton = <button type="button" onClick={toggle} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-600 hover:bg-neutral-200" aria-label={minimal ? t("navigation.expandMenu") : t("navigation.collapseMenu")}>
		{minimal ? <img src={branding.iconUrl} className="h-8 w-8 rounded-lg object-contain" height={32} width={32} alt="" /> : <Menu size={24} />}
	</button>;
	return (
		<div className={`mb-3 flex h-10 items-center ${minimal ? "" : "gap-2 px-1"}`}>
			{minimal ? <Tooltip label={t("navigation.expandMenu")} placement="right">{toggleButton}</Tooltip> : toggleButton}
			{!minimal && (
				<Link href={href} className="flex min-w-0 items-center gap-3">
					<img src={branding.iconUrl} className="h-9 w-9 rounded-xl object-contain drop-shadow-xs" height={36} width={36} alt="" />
					<span className="truncate text-xl font-bold tracking-tight text-neutral-900">{label ?? displayAppName}</span>
				</Link>
			)}
		</div>
	);
}
