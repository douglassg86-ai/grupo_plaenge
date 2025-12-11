import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-4 absolute top-0 left-0 w-full z-10">
      <div className="container flex justify-center items-center">
        <Link href="/">
            <Image src="/logo-wave-colorida.svg" alt="Wave Home Resort" width={180} height={60} data-ai-hint="resort logo" />
        </Link>
      </div>
    </header>
  );
}
