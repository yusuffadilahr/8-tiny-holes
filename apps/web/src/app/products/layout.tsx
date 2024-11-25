import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
     title: 'EasyShopper Site | Products',
     description: 'Welcome to Easy Shopper',
 }
 
export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}