import Image from "next/image";
import ContainerWide from '@/components/ContainerWide';

export default function Footer() {
  return (
    <ContainerWide>
      <Image
        src="/GUPPY-logo-gradient.webp"
        alt="Guppy typographic logo wide in a black gradient"
        className="w-full h-auto"
        width={2000}
        height={500}
      />
    </ContainerWide>
  )
}