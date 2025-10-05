import { PlaengeVanguardLogo } from "@/components/icons";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <PlaengeVanguardLogo className="fill-current text-primary" />
          <p className="text-center text-sm leading-loose md:text-left text-muted-foreground">
            © {currentYear} Grupo Plaenge. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
