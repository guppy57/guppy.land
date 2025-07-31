import { cn } from "@/lib/utils";
import {
  SunHorizon,
  Eyes,
  Sun,
  SealCheck,
  CalendarBlank,
  Smiley
} from "@phosphor-icons/react/dist/ssr";

interface IStatusBadgeProps {
  badgeType: string;
  text?: string;
  className?: string;
}

export default function StatusBadge(props: IStatusBadgeProps) {
  const containerStyle =
    "text-xs font-semibold text-black px-2 py-1 rounded-full font-departureMono tracking-tighter border border-gray-200/50 bg-white";

  if (props.badgeType === "publishDate") {
    return (
      <span className={cn(containerStyle, props.className)}>
        <CalendarBlank weight="bold" className="h-4 w-4 inline-block mr-0.5" />
        {props.text}
      </span>
    ); 
  }

  if (props.badgeType === "just-for-fun") {
    return (
      <span className={cn(containerStyle, props.className)}>
        <Smiley weight="bold" className="h-4 w-4 inline-block mr-0.5 -mt-[3px]" />
        just for fun
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
