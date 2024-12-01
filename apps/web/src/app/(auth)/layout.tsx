import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
     title: 'EasyShopper Site | Autentikasi User',
     description: 'Welcome to 8 TINY HOLES',
 }
 
export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}