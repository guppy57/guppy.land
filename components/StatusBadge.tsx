import { cn } from "@/lib/utils";
import {
  SunHorizon,
  Eyes,
  Sun,
  SealCheck,
} from "@phosphor-icons/react/dist/ssr";

interface IStatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge(props: IStatusBadgeProps) {
  const statuses = ["active", "inactive", "coming-soon", "completed"];
  const containerStyle =
    "text-xs font-semibold text-black px-2 py-1 rounded-full font-departureMono tracking-tighter border border-gray-200/50 bg-white";

  if (!statuses.includes(props.status)) {
    return null;
  }

  if (props.status === "coming-soon") {
    return (
      <span className={cn(containerStyle, props.className)}>
        <Eyes weight="bold" className="h-4 w-4 inline-block mr-0.5" />
        {props.status}
      </span>
    );
  }

  if (props.status === "inactive") {
    return (
      <span className={cn(containerStyle, props.className)}>
        <SunHorizon weight="bold" className="h-4 w-4 inline-block mr-1" />
        {props.status}
      </span>
    );
  }

  if (props.status === "active") {
    return (
      <span className={cn(containerStyle, props.className)}>
        <Sun weight="bold" className="h-4 w-4 inline-block mr-1" />
        {props.status}
      </span>
    );
  }

  if (props.status === "completed") {
    return (
      <span className={cn(containerStyle, props.className)}>
        <SealCheck weight="bold" className="h-4 w-4 inline-block mr-1" />
        {props.status}
      </span>
    );
  }
}
