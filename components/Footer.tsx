import Image from "next/image";

export default function Footer() {
  return (
    <Image
      src="/images/GUPPY-type-wide.svg"
      alt="Guppy typographic logo wide in black"
      className="w-full h-auto absolute bottom-0"
      width={100}
      height={300}
    />
  )
}