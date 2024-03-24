import React from "react";
import EntriesTable from "./EntriesTable";
import EntriesTableTest from "./EntriesTableTest";

export default function BillPreview() {
    return (
        <div className="m-8 p-8 border-2 aspect-[3/4] ">
            <section className=" mb-8">
                <p className=" text-sm italic">23.04.2024</p>
                <h1 className=" text-2xl">Jazz Unterricht - 001/2024</h1>
            </section>
            <div className="flex ">
                <section className="to mb-4 flex-1">
                    <p className=" text-sm italic">To</p>
                    <h2 className=" text-lg">Stage Factory</h2>
                    <p>Rheinstrasse 50, 12163 Berlin</p>
                </section>
                <section className="from mb-4">
                    <p className=" text-sm italic">From</p>
                    <h2 className="text-lg">Mariana Souza</h2>
                    <p>Deitmerstrasse 10, 12163 Berlin</p>
                    <p>Steuernummer:</p>
                    <p>SteuerID:</p>
                </section>
            </div>
            <section>
                <p>Here you can write some extra information</p>
            </section>
            <section className="my-4">
                <EntriesTableTest />
            </section>
            <section>
                <p>
                    Der Gesamtbetrag ist ab Erhalt dieser Rechnung zahlbar
                    innerhalb von 21 Tagen ohne Abzug.
                </p>
            </section>

            <section>
                <p>Mit freundlichen Grüßen,</p>
                <img src="" alt="" />
            </section>

            <section className="bank">
                <p>Targo Bank</p>
                <p>IBAN:</p>
                <p>BIC:</p>
            </section>
        </div>
    );
}
