import { cn } from "@/lib/utils";
import {
  SunHorizon,
  Eyes,
  Sun,
  SealCheck,
  CalendarBlank,
  Smiley,
  Brain,
  Cross,
  HandsPraying,
  CodesandboxLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Binary } from '@phosphor-icons/react';

interface IStatusBadgeProps {
  badgeType: string;
  text?: string;
  className?: string;
  darker?: boolean;
}

export default function StatusBadge(props: IStatusBadgeProps) {
  let containerStyle =
    "text-xs font-semibold text-black px-2 py-1 rounded-full font-departureMono tracking-tighter bg-white";

  containerStyle += props.darker ? " bg-black/5 border border-gray-500/38" : " border border-gray-200/50";

  if (props.badgeType === "publishDate") {
    return (
      <span className={cn(containerStyle, props.className)}>
        <CalendarBlank weight="bold" className="h-4 w-4 inline-block mr-0.5" />
        {props.text}
      </span>
    ); 
  }

  if (props.badgeType === "ai") {
    return (
      <span className={cn(containerStyle, props.className)}>
        <Binary weight="bold" className="h-4 w-4 inline-block mr-0.5" />
        ai
      </span>
    );
  }

  if (props.badgeType === "tech") {
    return (
      <span className={cn(containerStyle, props.className)}>
        <CodesandboxLogo weight="bold" className="h-4 w-4 inline-block mr-0.5" />
        tech
      </span>
    );
  }

  if (props.badgeType === "just-for-fun") {
    return (
      <span className={cn(containerStyle, props.className)}>
        <Smiley weight="bold" className="h-4 w-4 inline-block mr-1 -mt-[2px]" />
        just for fun
      </span>
    )
  }

  if (props.badgeType === "christianity") {
    return (
      <span className={cn(containerStyle, props.className)}>
        <Cross weight="bold" className="h-4 w-4 inline-block mr-1 -mt-[2px]" />
        christianity
      </span>
    )
  }

  if (props.badgeType === "religion") {
    return (
      <span className={cn(containerStyle, props.className)}>
        <HandsPraying weight="bold" className="h-4 w-4 inline-block mr-1 -mt-[2px]" />
        religion
      </span>
    )
  }

  if (props.badgeType === "philosophy") {
    return (
      <span className={cn(containerStyle, props.className)}>
        <Brain weight="bold" className="h-4 w-4 inline-block mr-1.5" />
        philosophy
      </span>
    )
  }

  if (props.badgeType === "coming-soon") {
    return (
      <span className={cn(containerStyle, props.className)}>
        <Eyes weight="bold" className="h-4 w-4 inline-block mr-0.5" />
        coming soon
      </span>
    );
  }

  if (props.badgeType === "inactive") {
    return (
      <span className={cn(containerStyle, props.className)}>
        <SunHorizon weight="bold" className="h-4 w-4 inline-block mr-1" />
        {props.badgeType}
      </span>
    );
  }

  if (props.badgeType === "active") {
    return (
      <span className={cn(containerStyle, props.className)}>
        <Sun weight="bold" className="h-4 w-4 inline-block mr-1" />
        {props.badgeType}
      </span>
    );
  }

  if (props.badgeType === "completed") {
    return (
      <span className={cn(containerStyle, props.className)}>
        <SealCheck weight="bold" className="h-4 w-4 inline-block mr-1" />
        {props.badgeType}
      </span>
    );
  }
}
