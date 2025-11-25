
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function ConventionPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open the dialog automatically on mount
    setIsOpen(true);
  }, []);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="p-0 border-0 max-w-md">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/convite_convencao.jpg"
            alt="Convite para convenção SHIFT"
            width={600}
            height={800}
            className="w-full h-auto rounded-t-lg"
          />
        </div>
        <div className="p-6 pt-0 text-center">
            <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold">Vagas limitadas!</AlertDialogTitle>
            <AlertDialogDescription>
                Confirme sua presença no link abaixo:
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4 sm:justify-center">
                <AlertDialogCancel>Fechar</AlertDialogCancel>
                <AlertDialogAction asChild>
                    <Link href="https://b.link/confirmacao_convencao_shift" target="_blank">
                        Confirmar Presença
                    </Link>
                </AlertDialogAction>
            </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
