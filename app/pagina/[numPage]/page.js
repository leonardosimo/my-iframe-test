import styles from "../../page.module.css";

export default function Paginas({ params }) {

    const dataMock = (new Array(parseInt(params.numPage))).fill({ id: "sde" + Date.now(), title: "asdasd" })
    return (
        <main className={styles.main} >
            <h1>
                NUMERO DE PAGINA {params.numPage}
            </h1>
            {
                dataMock.map((item, idx) => {
                    return <div key={idx} style={{ height: "300px" }}>
                        {JSON.stringify(item)}
                    </div>
                })
            }
        </main>
    );
}
