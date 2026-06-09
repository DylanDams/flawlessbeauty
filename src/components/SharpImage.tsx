import Image from "next/image";

type SharpImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export default function SharpImage({
  src,
  alt,
  sizes,
  priority = false,
  className,
}: SharpImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={95}
      className={className}
    />
  );
}
