import { Link } from "react-router-dom";
import style from "./ErrorPage.module.css";

interface IErrorProps {
    name?: string;
    description?: string;
}
export default function ErrorPage({ name, description }: IErrorProps) {
    return (
        <div className={style.container}>
            <div className={style.error_container}>
                <img
                    src={`${process.env.PUBLIC_URL}/404.svg`}
                    alt="Error"
                    className={style.err_svg}
                />
                <h1 className={style.err_id}>{name || "Error 404"}</h1>
                {/* <h2 className={style.err_reason}> Page does not exist</h2> */}
                <p className={style.err_des}>
                    {description ||
                        "Strona, której szukasz, może mieć zmienioną nazwę lub jest chwilowo niedostępna."}
                </p>
                <Link className={style.btn} to="/">
                    Wróć do strony głównej
                </Link>
            </div>
        </div>
    );
}
