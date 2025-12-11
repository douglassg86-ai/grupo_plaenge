import Image from 'next/image';
import ShareButton from './share-button';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-4 absolute top-0 left-0 w-full z-10">
      <div className="container flex justify-between items-center">
        <Link href="/">
            <Image src="/logo-wave-colorida.svg" alt="Wave Home Resort" width={150} height={50} data-ai-hint="resort logo" />
        </Link>
        <ShareButton />
      </div>
    </header>
  );
}
