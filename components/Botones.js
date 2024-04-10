'use client'
import { useRouter } from "next/navigation";
import styles from "../app/page.module.css";
export const BotonesGrupo = () => {
    const { push } = useRouter()
   
    return <div className={styles.botones}>
        <button onClick={()=>  push("/")} className={styles.button} type="button">
            pagina 1
        </button>
        <button onClick={()=>  push("/pagina/2")}  className={styles.button} type="button">
            pagina 2
        </button>
        <button onClick={()=>  push("/pagina/3")}  className={styles.button} type="button">
            pagina 3
        </button>
    </div>
}