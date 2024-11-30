export default function Page() {
    return (
        <main className="w-full h-full bg-neutral-800 opacity-35 p-4 rounded-xl gap-2 flex flex-col">
            <section className="w-full h-fit flex">
                <div className="grid grid-cols-3 w-full gap-2">
                    {Array.from({ length: 3 }).map((_, i: any) => (
                        <div key={i} className="w-full h-32 bg-black">
                            <h1 className="text-white">{i}</h1>
                        </div>
                    ))}
                </div>
            </section>
            <section className="w-full h-full bg-black rounded-xl">
            </section>
        </main>
    );
}