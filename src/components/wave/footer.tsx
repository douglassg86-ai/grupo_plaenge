import ExecutiveContact from './executive-contact';
import ShareButton from './share-button';

export default function Footer() {
  return (
    <footer className="bg-muted border-t">
      <div className="container py-8 space-y-6">
        <ExecutiveContact />
        <div className="text-center">
          <ShareButton />
        </div>
      </div>
    </footer>
  );
}
