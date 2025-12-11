import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Video, Map, Images, Table, Megaphone } from "lucide-react";
import Link from 'next/link';

const materials = [
  { icon: Book, title: "E-book", href: "https://drive.google.com/drive/folders/1npd5w-pWCDPZvaxTA7lsj7sVhsEwOyW3" },
  { icon: Video, title: "Vídeo", href: "https://drive.google.com/drive/folders/1YXSzq2fPxCAtvr6DF3AWVaNj5ZzpCskz" },
  { icon: Map, title: "Mapa Disponibilidade", href: "https://drive.google.com/drive/folders/1BwSY2teDTUwhsCEFsPcQjqp-26sAEKTY" },
  { icon: Images, title: "Fotos", href: "https://drive.google.com/drive/folders/1eSqcVsMhR_JkP9KV9FsDhegpWoSlC0r2" },
  { icon: Table, title: "Tabela", href: "https://drive.google.com/drive/folders/1nd2otVKNq2jOPfO9i-JlOHSPXc64b6rT" },
  { icon: Megaphone, title: "Materiais Promocionais", href: "https://drive.google.com/drive/folders/1IRHdPxpfZMnccssVzboPFiFtblHOcXIr" },
  { icon: Book, title: "ADM Condomínio", href: "https://drive.google.com/drive/folders/1UfPI9c6zqQIdxbiXxIfnT1P3X0LBkJpk" },
];


export default function Materials() {
    return (
        <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">
                Materiais de Apoio
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {materials.map((item, index) => (
                    <Button asChild variant="outline" className="h-24 flex-col gap-2" key={index}>
                        <Link href={item.href} target="_blank">
                            <item.icon className="h-8 w-8 text-primary" />
                            <span className="text-xs text-center">{item.title}</span>
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    )
}
