'use client'
import { ReactNode } from "react";

export default function Page({ params }: any) {
    const { detail } = params
    console.log(detail)
    return (
        <h1>
            {detail}
        </h1>
    );
}